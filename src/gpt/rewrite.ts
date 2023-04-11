import { Observable } from 'rxjs';
import spaceTrim from 'spacetrim';
import { askChatGpt } from './askChatGpt';

export function rewrite(textToRewrite: string): Observable<string>  {
    return askChatGpt({
        type: 'rewrite',
        requestText: spaceTrim(
            (block) => `

                Přeformuluj následující text:

                \`\`\`
                ${block(textToRewrite)}
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
 * TODO: [🎍] Do with ChatGptResponse and cache
 */
