import { Scenario, ScenarioUtils } from '../model/_';
import { beforeLessonScenario } from './10-before-lesson';
import { afterLessonScenario } from './20-after-lesson';

export async function lessonScenario({
    say,
    ask,
    askOptions,
    gptRewrite: rewrite,
    save,
    load,
    gptSummarize: summarize,
}: ScenarioUtils): Promise<Scenario> {
    const response = await askOptions(`V jaké fázi jsi?`, { beforeLesson: `Před hodinou`, afterLesson: `Po hodině` });

    if (response === 'beforeLesson') {
        return beforeLessonScenario;
    } else if (response === 'afterLesson') {
        return afterLessonScenario;
    } else {
        throw new Error(`Unknown option "${response}".`);
    }
}
