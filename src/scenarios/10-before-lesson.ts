import { ScenarioUtils } from '../model/_';

export async function beforeLessonScenario({ say, ask, rewrite, save }: ScenarioUtils): Promise<void> {
    const lessonPlan = await ask(rewrite(`Jaký máš cíl dnešní hodiny matematiky?`));
    await save({ lessonPlan });

    const primaryLearningMaterial = await ask(rewrite(`Jaké úlohy plánuješ dnes zadat žákům z učebnice?`));
    await save({ primaryLearningMaterial });

    const secondaryLearningMaterial = await ask(rewrite(`Co s nimi plánuješ dělat dál mimo učebnici?`));
    await save({ secondaryLearningMaterial });

    await say(rewrite(`Zkus se dnes soustředit více na žáka X`));
}
