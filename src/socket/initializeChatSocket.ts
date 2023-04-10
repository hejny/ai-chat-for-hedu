import { Subject } from 'rxjs';
import { Socket } from 'socket.io';
import { JournalChatMessage, TeacherChatMessage } from '../../interfaces/chatMessage';
import { SocketEventMap } from '../../interfaces/socket';
import { ChatMessage, Scenario, ScenarioUtils, toChatMessage } from '../model/_';
import { beforeLessonScenario } from '../scenarios/10-before-lesson';

class SocketScenarioUtils implements ScenarioUtils {
    constructor(private readonly connection: Socket<Pick<SocketEventMap, 'chatRequest' | 'chatResponse' | 'error'>>) {}

    public say(requestMessageOrContent: ChatMessage | string): Promise<void> {
        // console.log('say', requestMessageOrContent);

        // TODO: [🧶] In case of string use streamMessage
        // TODO: !!! Not request/response but out/in or sth semantically better

        let outMessage: JournalChatMessage = {
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

        return new Promise((resolve, reject) =>
            toChatMessage(requestMessageOrContent)
                .content.asObservable()
                .subscribe({
                    next(content) {
                        updateMessage({ content });
                    },
                    complete() {
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

    public rewrite(messageOrContent: ChatMessage | string): ChatMessage {
        const message = toChatMessage(messageOrContent);
        // TODO: !!! Implement
        return message;
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
    const scenarioUtils = new SocketScenarioUtils(connection);

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

    /*
    connection.on('chatRequest', async ({ content, parentMessageId, isComplete }) => {

            console.info({ parentMessageId });
            console.info(chalk.blue(content));

            const gptResponse = await chatGptApi.sendMessage(content, {
                parentMessageId,
                //parentMessageId: res.id

                onProgress(gptPartialResponse) {
                    console.info(chalk.blue(gptPartialResponse.text));
                    connection.emit('chatResponse', {
                        date: new Date(),
                        from: 'JOURNAL',
                        messageId: gptPartialResponse.id,
                        content: gptPartialResponse.text,
                        isComplete: false,
                    });
                },
            });

            console.info(gptResponse);
            console.info(chalk.blue(gptResponse.text));


            connection.emit('chatResponse', {
                date: new Date(),
                from: 'JOURNAL',
                messageId: gptResponse.id,
                content: gptResponse.text,
                isComplete: true,
            });
      
    });

    */
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
