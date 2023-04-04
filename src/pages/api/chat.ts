import chalk from 'chalk';
import { NextApiRequest, NextApiResponse } from 'next';
import spaceTrim from 'spacetrim';
import { OPENAI_API_KEY } from '../../../config';
import { chatGptApi, getInitialMessageId } from './utils/getInitialMessageId';

// console.info(`Using key ` + OPENAI_API_KEY);

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const body = JSON.parse(request.body) as Record<
        string,
        string
    >; /* <- TODO: [🎋] Parsing of JSON should be on body-parse NOT manually in each API route handler */
    const { requestText } = body;
    let { parentMessageId } = body;

    if (parentMessageId === 'INITIAL') {
        parentMessageId = await getInitialMessageId();
    } else if (!parentMessageId) {
        return response.status(200).json({
            responseText: `Key parentMessageId is missing in request`,
        });
    }

    try {
        console.info({ parentMessageId });
        console.info(chalk.blue(requestText));

        const gptResponse = await chatGptApi.sendMessage(requestText, {
            parentMessageId,
            //parentMessageId: res.id
        });

        console.info(gptResponse);
        console.info(chalk.blue(gptResponse.text));

        const responseText = gptResponse.text;

        return response.status(200).json({ responseText, messageId: gptResponse.id });
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        const errorMessage = error.message;

        return response.status(200).json({
            responseText: spaceTrim(
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
        });
    }
}

/**
 * TODO: !!! Stream
 * TODO: !!! Solve HTTP 504 issue
 * TODO: Cache the same request threads
 * TODO: Allow the quick buttons [Nemám cíl] [Chci probrat] [Chci dohnat]
 * TODO: Count usage
 */
