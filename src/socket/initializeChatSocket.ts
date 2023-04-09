import { Socket } from 'socket.io';
import { SocketEventMap } from '../../interfaces/socket';
import { ChatMessage, Scenario, ScenarioUtils, toChatMessage } from '../model/_';
import { beforeLessonScenario } from '../scenarios/10-before-lesson';

class SocketScenarioUtils implements ScenarioUtils {
    constructor(private readonly connection: Socket<Pick<SocketEventMap, 'chatRequest' | 'chatResponse' | 'error'>>) {}

    public async say(message: ChatMessage | string): Promise<void> {
        // TODO: [🧶] In case of string use streamMessage
        // TODO: !!! Not request/response but out/in or sth semantically better
        toChatMessage(message)
            .content.asObservable()
            .subscribe({
                next: (content) => void this.connection.emit('chatResponse', content),
                complete: () => void 0,
                error: (error: Error) => void this.connection.emit('error', error.message),
            });
    }
    public ask(message: ChatMessage | string): ChatMessage {}
    public rewrite(message: ChatMessage | string): ChatMessage {}
    public summarize(message: ChatMessage | string): ChatMessage {}
    public async load(
        ...keys: Array<string>
    ): Promise<
        Record<string, ChatMessage | null> /* <- TODO: Better generic typing same as requesting systems in Collboard */
    > {}
    public async save(messages: Record<string, ChatMessage>): Promise<void> {}
}

export async function initializeChatSocket(connection: Socket<SocketEventMap>): Promise<void> {
    const scenario: Scenario = beforeLessonScenario; /* <- TODO: !!! Test also beforeLessonScenario */
    const scenarioUtils = new SocketScenarioUtils();

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
