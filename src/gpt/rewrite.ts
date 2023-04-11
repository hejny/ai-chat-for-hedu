import { Observable } from 'rxjs';
import spaceTrim from 'spacetrim';
import { askChatGpt } from './askChatGpt';

interface RewriteOptions {
    cache: Array<string>;
    textToRewrite: string;
}

export function rewrite(options: RewriteOptions): Observable<string> {
    const { cache, textToRewrite } = options;

    return askChatGpt({
        cache: ['rewrite', ...cache],
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
