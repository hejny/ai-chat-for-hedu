import { ScenarioUtils } from '../model/_';

export async function beforeLessonScenario({ say, ask, rewrite, save }: ScenarioUtils): Promise<void> {
    // TODO: !!!!1 Both messages must work
    // console.log('beforeLessonScenario', 0);
    say(`test test test test 1`);
    await say(`test test test test 2`);
    await say(`test test test test 3`);


    /*

    // TODO: !!!!2 Make All bellow active:


    console.log('beforeLessonScenario', 1);
    const lessonPlan = await ask(rewrite(`Jaký máš cíl dnešní hodiny matematiky?`));
    await save({ lessonPlan });

    console.log('beforeLessonScenario', 2);
    const primaryLearningMaterial = await ask(rewrite(`Jaké úlohy plánuješ dnes zadat žákům z učebnice?`));
    await save({ primaryLearningMaterial });

    console.log('beforeLessonScenario', 3);
    const secondaryLearningMaterial = await ask(rewrite(`Co s nimi plánuješ dělat dál mimo učebnici?`));
    await save({ secondaryLearningMaterial });

    console.log('beforeLessonScenario', 4);
    await say(rewrite(`Zkus se dnes soustředit více na žáka X`));

    */
}
