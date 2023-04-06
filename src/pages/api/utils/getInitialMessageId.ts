import chalk from 'chalk';
import { ChatGPTAPI } from 'chatgpt';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import spaceTrim from 'spacetrim';
import { INITIAL_SHEM_MESSAGE_TEXT, OPENAI_API_KEY } from '../../../../config';

export const chatGptApi = new ChatGPTAPI({
    apiKey: OPENAI_API_KEY!,
    completionParams: {
        temperature: 0.5,
        top_p: 0.8,
    },
});

export async function getInitialMessageId(): Promise<string> {
    const messageCached = await readFile(join(process.cwd(), 'chat/message.md'), 'utf8').catch(() => null);

    if (messageCached) {
        return messageCached.match(/<!--\s*(?<messageId>.*)\s*-->/)!.groups!.messageId;
    }

    console.info(chalk.blue(INITIAL_SHEM_MESSAGE_TEXT));
    const gptResponse = await chatGptApi.sendMessage(INITIAL_SHEM_MESSAGE_TEXT /*{ stream: true } <- !!! Play with */);

    console.info(gptResponse);
    console.info(chalk.green(gptResponse.text));

    await writeFile(
        join(process.cwd(), 'chat/message.md'),
        spaceTrim(
            (block) => `

                ${block(INITIAL_SHEM_MESSAGE_TEXT)}

                ---

                <!-- ${gptResponse.id} -->
                
                ${block(gptResponse.text)}
    
            `,
        ),
    );

    return gptResponse.id;
}

/**
 * TODO: [📂] Implement full folder,hierarchical cache
 * TODO: Make separate testing script
 */
