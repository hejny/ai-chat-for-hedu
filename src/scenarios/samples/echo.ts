import spaceTrim from 'spacetrim';
import { ScenarioUtils } from '../../model/_';

export async function echoScenario({
    say,
    ask,
    askOptions,
    rewrite,
    save,
    load,
    summarize,
}: ScenarioUtils): Promise<void> {
    const response = await ask(`Napiš cokoliv`);
    await say(
        await spaceTrim(
            async (block) => `
                Napsal jsi:

                \`\`\`
                ${block(await response.content.asPromise())}
                \`\`\`
            `,
        ),
    );
}

/**
 * TODO: !!! Do not speech "zpětný apostrof, zpětný apostrof, zpětný apostrof,...",
 */
