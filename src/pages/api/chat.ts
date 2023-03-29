import { ChatGPTAPI } from 'chatgpt';
import { NextApiRequest, NextApiResponse } from 'next';
import spaceTrim from 'spacetrim';
import { OPENAI_API_KEY } from '../../../config';

const api = new ChatGPTAPI({
    apiKey: OPENAI_API_KEY!,
    completionParams: {
        temperature: 0.5,
        top_p: 0.8,
    },
});

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const { requestText } = JSON.parse(
        request.body,
    ); /* <- TODO: [🎋] Parsing of JSON should be on body-parse NOT manually in each API route handler */

    try {
        const gptResponse = await api.sendMessage(requestText, {
            //parentMessageId: res.id
        });

        const responseText = gptResponse.text;
        response.status(200).json({ responseText });
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        response.status(200).json({
            responseText: spaceTrim(
                (block) => `
                    Problem with OpenAI API:

                    \`\`\`text
                    ${block(error.message)}
                    \`\`\`
                `,
            ),
        });
    }
}
