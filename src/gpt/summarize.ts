import { Observable } from 'rxjs';
import spaceTrim from 'spacetrim';
import { askChatGpt } from './askChatGpt';

interface SummarizeOptions {
    cache: Array<string>;
    textToSummarize: string;
}

export function summarize(options: SummarizeOptions): Observable<string> {
    const { cache, textToSummarize } = options;

    return askChatGpt({
        cache: ['summarize', ...cache],
        requestText: spaceTrim(
            (block) => `

                TLDR / Ve zkratce sumarizuj následující text:

                \`\`\`
                ${block(textToSummarize)}
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
 * TODO: [🥽] It is but ugly-prectise to name summarize and rewrite by same name as standalone functions and also a methods of ScenarioUtils - figure out two sets of unique names
 */
