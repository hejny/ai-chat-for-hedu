import { Observable } from 'rxjs';
import spaceTrim from 'spacetrim';
import { askChatGptThread } from './askChatGptThread';

interface AskOptions {
    cache: Array<string>;
    textsToAsk: Array<string>;
}

export function ask(options: AskOptions): Observable<string> {
    const { cache, textsToAsk } = options;

    return askChatGptThread({
        cache: ['ask', ...cache],
        requestTexts: textsToAsk.map((text) => spaceTrim(text)),
        completionParams: {
            temperature: 0.5,
            top_p: 0.8,
        },
    });
}

/**
 * TODO: [🎍] Do with ChatGptResponse and cache
 * TODO: [🥽] It is but ugly-prectise to name summarize and rewrite by same name as standalone functions and also a methods of ScenarioUtils - figure out two sets of unique names
 */
