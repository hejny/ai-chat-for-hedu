import { Scenario } from '../model/_';
import { beforeLessonScenario } from './10-before-lesson';
import { afterLessonScenario } from './20-after-lesson';

export const scenarios: Array<Scenario> = [beforeLessonScenario, afterLessonScenario];
