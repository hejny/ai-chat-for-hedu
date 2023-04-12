import { ScenarioUtils } from '../../model/_';

export async function optionsScenario({
    say,
    ask,
    askOptions,
    rewrite,
    save,
    load,
    summarize,
}: ScenarioUtils): Promise<void> {
    const response = await askOptions(`Jaké je tvé oblíbené zvíře`, {
        bunny: `🐇 Králík`,
        dog: `🐕 Pes`,
        cat: `🐈 Kočka`,
    });
    await say(`Zvolena možnost "${response}"`);
}

/**
 * TODO: !!!!!!!!!! Make this work
 */
