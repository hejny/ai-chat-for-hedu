import { Observable } from 'rxjs';
import spaceTrim from 'spacetrim';
import { askChatGpt } from './askChatGpt';

export function summarize(textToSummarizee: string): Observable<string> {
    return askChatGpt({
        type: 'rewrite',
        requestText: spaceTrim(
            (block) => `

                Sumarizuj následující text:

                \`\`\`
                ${block(textToSummarizee)}
                \`\`\`
        
            `,
        ),
        completionParams: {
            temperature: 0.5,
            top_p: 0.8,
        },
    });
}

/**
 * TODO: Maybe use "TL;DR"
 * TODO: [🎍] Do with ChatGptResponse and cache
 */
