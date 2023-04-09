import { Socket } from 'socket.io-client';
import { SocketEventMap } from '../../interfaces/socket';

export function initializeChatSocket(connection: Socket<SocketEventMap>): void {




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


    


    connection.on('chatRequest', async ({ content, parentMessageId, isComplete }) => {
    



        try {
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

            /*
            TODO: [📂] Implement full folder,hierarchical cache
            await writeFile(join(process.cwd(), 'chat/message.md'), gptResponse.text);
            */

            connection.emit('chatResponse', {
                date: new Date(),
                from: 'JOURNAL',
                messageId: gptResponse.id,
                content: gptResponse.text,
                isComplete: true,
            });
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }

            const errorMessage = error.message;
            connection.emit(
                'error',
                spaceTrim(
                    (block) => `
                            Problem with OpenAI API:
                            Using key \`${
                                OPENAI_API_KEY!.substring(0, 10) +
                                '***' +
                                OPENAI_API_KEY!.substring(
                                    OPENAI_API_KEY!.length - 5,
                                    OPENAI_API_KEY!.length,
                                ) /* <- TODO: Hide key util */
                            }\`
        
                            \`\`\`text
                            ${block(errorMessage)}
                            \`\`\`
                        `,
                ),
            );
        }
    });
}
