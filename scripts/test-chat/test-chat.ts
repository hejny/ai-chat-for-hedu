#!/usr/bin/env ts-node

import chalk from 'chalk';
import { rewrite } from '../../src/gpt/rewrite';

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
    rewrite({ textToRewrite: `Testovací zpráva`, cache: [`testChat`] });
}
