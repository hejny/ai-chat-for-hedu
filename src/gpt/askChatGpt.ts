import chalk from 'chalk';
import { ChatGPTAPI, openai } from 'chatgpt';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { Observable } from 'rxjs';
import spaceTrim from 'spacetrim';
import { OPENAI_API_KEY } from '../../config';

interface AskChatGptOptions {
    type: string;
    requestText: string;
    completionParams: Partial<
        Omit<openai.CreateChatCompletionRequest, 'messages' | 'n' | 'stream'>
    > /*<- TODO: Use sth like "Extract<ChatGPTAPIOptions, 'completionParams'>" */;
}

/**
 * One message reply from ChatGPT
 */
export function askChatGpt(options: AskChatGptOptions): Observable<string> {
    const { type, requestText, completionParams } = options;

    const chatGptApi = new ChatGPTAPI({
        apiKey: OPENAI_API_KEY!,
        completionParams,
    });

    return new Observable((subscriber) => {
        let isDestroyed = false; /* <- TODO: Use */
        (async () => {
            /*
            const messageCached = await readFile(join(process.cwd(), 'chat/message.md'), 'utf8').catch(() => null);

            if (messageCached) {
                return messageCached.match(/<!--\s*(?<messageId>.*)\s*-->/)!.groups!.messageId;
            }
            */

            console.info(chalk.gray(requestText));
            const gptResponse = await chatGptApi.sendMessage(requestText, {
                onProgress(partialResponse) {
                    subscriber.next(partialResponse.text);
                },
            });

            console.info(gptResponse);
            console.info(chalk.magenta(gptResponse.text));

            const cacheDirPath = join(process.cwd(), 'chat', type);
            const cacheFilePath = join(cacheDirPath, `${gptResponse.id}.md`);

            await mkdir(cacheDirPath, { recursive: true });
            await writeFile(
                cacheFilePath,
                spaceTrim(
                    (block) => `
    
                    ${block(requestText)}
    
                    ---
    
                    <!-- ${gptResponse.id} -->
                    
                    ${block(gptResponse.text)}
        
                `,
                ),
            );

            subscriber.next(gptResponse.text);
            subscriber.complete();
        })();

        return () => void (isDestroyed = true);
    });
}
