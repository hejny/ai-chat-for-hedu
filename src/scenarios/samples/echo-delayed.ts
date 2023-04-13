import spaceTrim from 'spacetrim';
import { forTime } from 'waitasecond';
import { ScenarioUtils } from '../../model/_';

export async function echoDelayedScenario({
    say,
    ask,
    askOptions,
    rewrite,
    save,
    load,
    summarize,
}: ScenarioUtils): Promise<void> {
    await say(`Ahoj,\nzatím tě ignoruju`);
    await forTime(3000);
    const response = await ask(`A teď napiš cokoliv`);
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
