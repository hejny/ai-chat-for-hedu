import chalk from 'chalk';
import { ChatGPTAPI } from 'chatgpt';
import { INITIAL_SHEM_MESSAGE_TEXT, OPENAI_API_KEY } from '../../../../config';

export const chatGptApi = new ChatGPTAPI({
    apiKey: OPENAI_API_KEY!,
    completionParams: {
        temperature: 0.5,
        top_p: 0.8,
    },
});

let initialMessageId: string | null = null;

export async function getInitialMessageId(): Promise<string> {
    if (initialMessageId !== null) {
        return initialMessageId;
    }

    console.info(chalk.blue(INITIAL_SHEM_MESSAGE_TEXT));
    const gptInitialResponse = await chatGptApi.sendMessage(INITIAL_SHEM_MESSAGE_TEXT, {});
    console.info(gptInitialResponse);
    console.info(chalk.green(gptInitialResponse.text));

    initialMessageId = gptInitialResponse.id;
    return initialMessageId;
}
