import { forTime } from 'waitasecond';
import { ScenarioUtils } from '../../model/_';

export async function infiniteScenario({
    say,
    ask,
    askOptions,
    gptRewrite,
    save,
    load,
    gptSummarize,
}: ScenarioUtils): Promise<void> {
    for (let i = 0; i < Infinity; i++) {
        await say(`${i + 1}. zpráva`);

        if (i % 3 === 1) {
            await say(`Čekám`);
            await forTime(6000);
        }
    }
}

/**
 * TODO: Use here isDestroyed
 * TODO: Make it server-restart resistant
 */
