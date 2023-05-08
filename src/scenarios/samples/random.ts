import { forTime } from 'waitasecond';
import { Scenario, ScenarioUtils } from '../../model/_';
import { echoScenario } from './echo';
import { waitScenario } from './wait';

export async function randomScenario({
    say,
    ask,
    askOptions,
    gptRewrite: rewrite,
    save,
    load,
    gptSummarize: summarize,
}: ScenarioUtils): Promise<Scenario> {
    await say('Vyberu náhodný scénář 🎲 ');
    await forTime(1000);
    await say('🎲');
    await forTime(1000);

    if (Math.random() > 0.5) {
        await say('Vybral jsem ukázku čekání:');
        return waitScenario;
    } else {
        await say('Vybral jsem ukázku papouškování:');
        return echoScenario;
    }
}

/**
 * TODO: !!!!!!!!!! Make this work
 */
