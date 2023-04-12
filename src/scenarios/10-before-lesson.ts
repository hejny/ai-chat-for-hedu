import spaceTrim from 'spacetrim';
import { ScenarioUtils } from '../model/_';

export async function beforeLessonScenario({
    say,
    ask,
    askOptions,
    rewrite,
    save,
    load,
    summarize,
}: ScenarioUtils): Promise<void> {
    while (true) {
        await say(`A`);
        await say(`B`);
        await say(`C`);
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

    /*
    const response = await askOptions(`V jaké fázi jsi?`, { beforeLesson: `Před hodinou`, afterLesson: `Po hodině` });
    await say(`Zvolena možnost "${response}"`);

    /*
    // TODO: !!! Make following scenario active:

    console.log('beforeLessonScenario', 1);
    const lessonPlan = await ask(rewrite(`Jaký máš cíl dnešní hodiny matematiky?`));
    await save({ lessonPlan });

    console.log('beforeLessonScenario', 2);
    const primaryLearningMaterial = await ask(rewrite(`Jaké úlohy plánuješ dnes zadat žákům z učebnice?`));
    await save({ primaryLearningMaterial });

    console.log('beforeLessonScenario', 3);
    const secondaryLearningMaterial = await ask(rewrite(`Co s nimi plánuješ dělat dál mimo učebnici?`));
    await save({ secondaryLearningMaterial });

    await say(`...hmm...`);
    await forTime(1000);

    console.log('beforeLessonScenario', 4);
    await say(rewrite(`Zkus se dnes soustředit více na žáka X`));

    */
}
