#!/usr/bin/env ts-node

import chalk from 'chalk';
import { ChatGPTAPI } from 'chatgpt';
import { INITIAL_SHEM_MESSAGE_TEXT, OPENAI_API_KEY } from '../../config';

testChat()
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        console.error(chalk.bgRed(` Integration tests failed `));
        process.exit(1);
    })
    .then(() => {
        console.error(chalk.bgGreen(` Integration tests passed `));
        process.exit(0);
    });

async function testChat() {
    console.info(`🗯  Test chat`);

    const chatGptApi = new ChatGPTAPI({
        apiKey: OPENAI_API_KEY!,
        completionParams: {
            temperature: 0.5,
            top_p: 0.8,
        },
    });

    console.info(chalk.blue(INITIAL_SHEM_MESSAGE_TEXT));
    const gptInitialResponse = await chatGptApi.sendMessage(
        INITIAL_SHEM_MESSAGE_TEXT /*{ stream: true } <- !!! Play with */,
    );
    console.info(gptInitialResponse);
    console.info(chalk.green(gptInitialResponse.text));
}
