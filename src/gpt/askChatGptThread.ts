import chalk from 'chalk';
import { ChatGPTAPI, openai } from 'chatgpt';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { Observable } from 'rxjs';
import { OPENAI_API_KEY } from '../../config';

interface AskChatGptThreadOptions {
    cache: Array<string>;
    requestTexts: string[];
    completionParams: Partial<Omit<openai.CreateChatCompletionRequest, 'messages' | 'n' | 'stream'>>;
}

export function askChatGptThread(options: AskChatGptThreadOptions): Observable<string> {
    const { cache, requestTexts, completionParams } = options;

    const chatGptApi = new ChatGPTAPI({
        apiKey: OPENAI_API_KEY!,
        completionParams,
    });

    return new Observable((subscriber) => {
        let isDestroyed = false;

        (async () => {
            const responses: Array<{ requestText: string; responseText: string; responseId: string }> = [];
            let parentMessageId: undefined | string = undefined;

            let i = 0;
            for (const requestText of requestTexts) {
                i++;

                console.info(chalk.gray(requestText));
                const gptResponse = (await chatGptApi.sendMessage(requestText, {
                    parentMessageId,
                    onProgress(partialResponse) {
                        if (i !== requestTexts.length) {
                            return;
                        }
                        // Only on last requestText

                        subscriber.next(partialResponse.text);
                    },
                })) as any;

                parentMessageId = gptResponse.id;

                console.info(gptResponse);
                console.info(chalk.magenta(gptResponse.text));

                responses.push({ requestText, responseText: gptResponse.text, responseId: gptResponse.id });
            }

            const cacheDirPath = join(process.cwd(), 'data', 'chat', ...cache);
            await mkdir(cacheDirPath, { recursive: true });
            const cacheFilePath = join(cacheDirPath, `${Date.now()}.md`);
            await writeFile(
                cacheFilePath,

                responses
                    .map(
                        ({ requestText, responseText, responseId }, i) =>
                            requestText + `\n\n\n---\n\n<!-- ${responseId} -->\n\n\n` + responseText,
                    )

                    .join(`\n\n\n---\n\n\n`),
            );

            subscriber.next(responses[responses.length - 1].responseText);
            subscriber.complete();
        })();

        return () => void (isDestroyed = true);
    });
}
