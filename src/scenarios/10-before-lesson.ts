import { forTime } from 'waitasecond';
import { ScenarioUtils } from '../model/_';

export async function beforeLessonScenario({
    say,
    ask,
    askOptions,
    gptRewrite,
    save,
    load,
    gptSummarize,
}: ScenarioUtils): Promise<void> {
    const lessonPlan = await ask(gptRewrite(`Jaký máš cíl dnešní hodiny matematiky?`));
    await save({ lessonPlan });

    const primaryLearningMaterial = await ask(gptRewrite(`Jaké úlohy plánuješ dnes zadat žákům z učebnice?`));
    await save({ primaryLearningMaterial });

    const secondaryLearningMaterial = await ask(gptRewrite(`Co s nimi plánuješ dělat dál mimo učebnici?`));
    await save({ secondaryLearningMaterial });

    await say(`...hmm...`);
    await forTime(1000);

    console.log('beforeLessonScenario', 4);
    await say(gptRewrite(`Zkus se dnes soustředit více na žáka X`));
}
