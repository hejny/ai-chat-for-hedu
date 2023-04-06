import chalk from 'chalk';
import { ChatGPTAPI } from 'chatgpt';
import { writeFile } from 'fs/promises';
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

let initialMessageId: string | null = null; /* <- !!! Cache ONLY from file */

export async function getInitialMessageId(): Promise<string> {
    if (initialMessageId !== null) {
        return initialMessageId;
    }

    console.info(chalk.blue(INITIAL_SHEM_MESSAGE_TEXT));
    const gptResponse = await chatGptApi.sendMessage(INITIAL_SHEM_MESSAGE_TEXT /*{ stream: true } <- !!! Play with */);

    console.info(gptResponse);
    console.info(chalk.green(gptResponse.text));

    await writeFile(
        join(process.cwd(), 'chat/_initial-shem-message.md'),
        spaceTrim(
            (block) => `
    
                ${block(INITIAL_SHEM_MESSAGE_TEXT)}

                ---

                ${block(gptResponse.text)}
    
            `,
        ),
    );

    initialMessageId = gptResponse.id /* <- !!! Cache ONLY from file */;
    return initialMessageId;
}

/**
 * TODO: Make cached wrapper
 * TODO: Make separate testing script
 */
