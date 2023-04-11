import { Observable } from 'rxjs';
import spaceTrim from 'spacetrim';
import { askChatGpt } from './askChatGpt';

export function rewrite(textToRewrite: string): Observable<string> {
    return askChatGpt({
        type: 'rewrite' /* <- TODO: !!! Make type more structural chat/rewrite/before-lesson/math/chat123.md */,
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
