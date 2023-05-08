import { ScenarioUtils } from '../../model/_';

export async function optionsScenario({
    say,
    ask,
    askOptions,
    gptRewrite: rewrite,
    save,
    load,
    gptSummarize: summarize,
}: ScenarioUtils): Promise<void> {
    const response = await askOptions(`Jaké je tvé oblíbené zvíře?`, {
        bunny: `Králík`,
        dog: `Pes`,
        cat: `Kočka`,
        /*
        TODO: Use emojis without need to rewrite in chat
            bunny: `🐇 Králík`,
            dog: `🐕 Pes`,
            cat: `🐈 Kočka`,
        */
    });
    await say(`Zvolena možnost "${response}"`);
}

/**
 * TODO: openOptions with placement to sentence - I also like cats, they are fluffy and kind
 */
