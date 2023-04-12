import chalk from 'chalk';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { normalizeToKebabCase } from 'n12';
import { dirname, join } from 'path';
import { Observable, of, Subject } from 'rxjs';
import sjcl from 'sjcl';
import { Socket } from 'socket.io';
import { v4 } from 'uuid';
import { forTime } from 'waitasecond';
import YAML from 'yaml';
import { rewrite } from '../gpt/rewrite';
import { summarize } from '../gpt/summarize';
import { SocketEventMap } from '../socket/SocketEventMap';
import { JournalChatMessage, TeacherChatMessage } from './chatMessage';
import { ChatMessage, ScenarioUtils, toChatMessage } from './_';

export class SocketScenarioUtils implements ScenarioUtils {
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
            date: new Date() /* <- TODO: Rename+split into created+modified */,
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
        await this.say(requestMessage);
        const responseMessage = new ChatMessage(requestMessage, 'JOURNAL', this.listenResponse());
        await responseMessage.content.asPromise();
        return responseMessage;
    }

    public listenResponse(): Observable<string> {
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
        this.connection.on('chatRequest', listener);
        return responseMessageContent;
    }

    public async askOptions<optionKey extends string>(
        question: ChatMessage | string,
        options: Record<optionKey, ChatMessage | string>,
    ): Promise<optionKey> {
        await this.say(question);
        await forTime(700);

        let i = 0;
        for (const [key, option] of Object.entries<ChatMessage | string>(options)) {
            const order = i++; /* <- TODO: Use letters */
            await this.say(toChatMessage(option).modifyContent((content) => `${order}) ${content}`));
        }

        while (true) {
            const response = await this.listenResponse();
            const responseContent = await new Promise<string>((resolve) =>
                response.subscribe(resolve),
            ); /* <- TODO: use here Prombservable */

            const responseContentAsNumber = parseInt(responseContent);

            if (
                !isNaN(responseContentAsNumber) &&
                responseContentAsNumber > 0 &&
                responseContentAsNumber <= Object.keys(options).length
            ) {
                // TODO: !!! Check that is in range
                return Object.keys(options)[responseContentAsNumber - 1] as optionKey;
            }

            // TODO: Same with a-z A-Z
            // TODO: Same literal responses (case insensitive, trimmed)

            await this.say(
                `Bohužel ti nerozumím, napíšem mi to ještě jednou nebo klikneš na jednu z možností.` /* <- TODO: !!!!!!!!!!!!!!!!!!!!!!!!!! Use rewrite */,
            );
        }
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

        const summarizedContent = new Subject<string>();

        message.content.asPromise().then((content) => {
            summarize({
                textToSummarize: content,
                cache: [this.scenarioName, sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(content))],
            }).subscribe({
                next(value) {
                    summarizedContent.next(value);
                },
                complete() {
                    summarizedContent.complete();
                },
                error(error) {
                    summarizedContent.error(error);
                },
            });
        });

        return new ChatMessage(
            message.parentMessage,
            message.from,
            summarizedContent /* <- Note: No need to convert .asObservable() */,
        );
    }

    private keyToSaveFilePath(key: string) {
        return join(process.cwd(), 'data', 'user', 'sample', `${normalizeToKebabCase(key)}.yaml`);
    }

    public async save(messages: Record<string, ChatMessage>): Promise<void> {
        for (const [key, message] of Object.entries(messages)) {
            const content = await message.content.asPromise();
            const { from /* <- TODO: Also save other things like date and parentMessage */ } = message;

            const saveFilePath = this.keyToSaveFilePath(key);
            await mkdir(dirname(saveFilePath), { recursive: true });

            await writeFile(
                saveFilePath,
                YAML.stringify(
                    {
                        from,
                        content,
                    },
                    { indent: 4 },
                ),
            );
        }
    }

    public async load(
        ...keys: Array<string>
    ): Promise<
        Record<string, ChatMessage | null> /* <- TODO: Better generic typing same as requesting systems in Collboard */
    > {
        const result: Record<string, ChatMessage | null> = {};

        for (const key of keys) {
            const filePath = this.keyToSaveFilePath(key);
            let message: ChatMessage | null = null;

            try {
                const fileContent = await readFile(filePath, 'utf8');
                const data = YAML.parse(fileContent);
                const { from, content } = data;

                message = new ChatMessage(null /* <- TODO: Hydrate parentMessage */, from, of(content));
            } catch (error) {
                if (!(error instanceof Error)) {
                    throw error;
                }

                console.error(`Error loading chat message ${key}: ${error.message}`);
            }

            result[key] = message;
        }

        return result;
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
 * TODO: [🥽] It is but ugly-prectise to name summarize and rewrite by same name as standalone functions and also a methods of ScenarioUtils - figure out two sets of unique names
 */
