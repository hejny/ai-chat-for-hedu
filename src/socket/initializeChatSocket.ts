import chalk from 'chalk';
import { normalizeToKebabCase } from 'n12';
import { Subject } from 'rxjs';
import sjcl from 'sjcl';
import { Socket } from 'socket.io';
import { v4 } from 'uuid';
import { JournalChatMessage, TeacherChatMessage } from '../../interfaces/chatMessage';
import { SocketEventMap } from '../../interfaces/socket';
import { rewrite } from '../gpt/rewrite';
import { ChatMessage, Scenario, ScenarioUtils, toChatMessage } from '../model/_';
import { beforeLessonScenario } from '../scenarios/10-before-lesson';

class SocketScenarioUtils implements ScenarioUtils {
    constructor(
        private readonly connection: Socket<Pick<SocketEventMap, 'chatRequest' | 'chatResponse' | 'error'>>,
        private readonly scenarioName: string,
    ) {}

    public say(requestMessageOrContent: ChatMessage | string): Promise<void> {
        // console.log('say', requestMessageOrContent);

        // TODO: [🧶] In case of string use streamMessage
        // TODO: !!! Not request/response but out/in or sth semantically better

        let outMessage: JournalChatMessage = {
            id: v4(),
            date: new Date(),
            from: 'JOURNAL',
            content: '',
            isComplete: false,
        };

        const updateMessage = (partialOutMessage: Partial<JournalChatMessage>) => {
            outMessage = { ...outMessage, ...partialOutMessage };
            // console.log('updateMessage', outMessage);
            this.connection.emit('chatResponse', outMessage);
        };

        const requestMessage = toChatMessage(requestMessageOrContent);

        return new Promise((resolve, reject) =>
            requestMessage.content.asObservable().subscribe({
                next(content) {
                    updateMessage({ content });
                },
                complete() {
                    console.log(chalk.green(requestMessage.content.asCurrentValue()));
                    updateMessage({ isComplete: true });
                    resolve();
                },
                error: (error: Error) => {
                    this.connection.emit('error', error.message);
                    reject();
                },
            }),
        );
    }

    public async ask(requestMessageOrContent: ChatMessage | string): Promise<ChatMessage> {
        const requestMessage = toChatMessage(requestMessageOrContent);

        const responseMessageContent = new Subject<string>();

        const listener = (inMessage: TeacherChatMessage) => {
            console.log('chatRequest', inMessage);

            console.log(chalk.blue(inMessage.content));

            responseMessageContent.next(inMessage.content);

            if (inMessage.isComplete) {
                responseMessageContent.complete();
                this.connection.off('chatRequest', listener);
            }
        };

        await this.say(requestMessage);

        this.connection.on('chatRequest', listener);
        return new ChatMessage(requestMessage, 'JOURNAL', responseMessageContent);
    }

    // TODO: DRY rewrite and summarize

    public rewrite(messageOrContent: ChatMessage | string): ChatMessage {
        const message = toChatMessage(messageOrContent);

        const rewrittenContent = new Subject<string>();

        message.content.asPromise().then((content) => {
            rewrite({
                textToRewrite: content,
                cache: [this.scenarioName, sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(content))],
            }).subscribe({
                next(value) {
                    rewrittenContent.next(value);
                },
                complete() {
                    rewrittenContent.complete();
                },
                error(error) {
                    rewrittenContent.error(error);
                },
            });
        });

        return new ChatMessage(
            message.parentMessage,
            message.from,
            rewrittenContent /* <- Note: No need to convert .asObservable() */,
        );
    }

    public summarize(messageOrContent: ChatMessage | string): ChatMessage {
        const message = toChatMessage(messageOrContent);
        // TODO: !!! Implement
        return message;
    }

    public async load(
        ...keys: Array<string>
    ): Promise<
        Record<string, ChatMessage | null> /* <- TODO: Better generic typing same as requesting systems in Collboard */
    > {
        return {
            /* TODO: !!! Implement */
        };
    }

    public async save(messages: Record<string, ChatMessage>): Promise<void> {
        // TODO: !!! Implement
    }
}

export async function initializeChatSocket(connection: Socket<SocketEventMap>): Promise<void> {
    const scenario: Scenario = beforeLessonScenario; /* <- TODO: !!! Test also beforeLessonScenario */
    const scenarioUtils = new SocketScenarioUtils(connection, normalizeToKebabCase(beforeLessonScenario.name));

    try {
        await scenario({
            // TODO: Util to bing every method at once
            say: scenarioUtils.say.bind(scenarioUtils),
            ask: scenarioUtils.ask.bind(scenarioUtils),
            rewrite: scenarioUtils.rewrite.bind(scenarioUtils),
            summarize: scenarioUtils.summarize.bind(scenarioUtils),
            load: scenarioUtils.load.bind(scenarioUtils),
            save: scenarioUtils.save.bind(scenarioUtils),
        });
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        connection.emit('error', error.message);
    }
}

/*
    TODO: [🧶] util streamMessage

    (async () => {
        const words = [];
        for (const word of splitWords(INITIAL_JOURNAL_MESSAGE_TEXT)) {
            if (isDestroyed) {
                return;
            }
            await forTime(100);

            words.push(word);

            initialMessage.content = joinWords(words);
            setMessages([initialMessage]);
        }
    })();

*/

/**
 * TODO: !!! ScenarioUtils to model
 */
