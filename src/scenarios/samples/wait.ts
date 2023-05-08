import { forTime } from 'waitasecond';
import { ScenarioUtils } from '../../model/_';

export async function waitScenario({
    say,
    ask,
    askOptions,
    gptRewrite,
    save,
    load,
    gptSummarize,
}: ScenarioUtils): Promise<void> {
    /* not await */ say(`Říkám`);
    /* not await */ say(`Najednou`);
    /* not await */ say(`Mnoho`);
    /* not await */ say(`Různých`);
    /* not await */ say(`Věcí`);

    await say(gptRewrite(`Ale teď budu čekat než dopíšu zprávu`));
    await say(`A budu čekat 5 vteřin...`);

    await forTime(5000);

    await say(`A budu čekat 10 vteřin a odpočítávat...`);

    for (let i = 10; i > 0; i--) {
        await forTime(1000);
        /* not await */ say(i.toString());
    }

    await say(`Skvělé, že jsi počkal až sem!`);
}

/**
 * TODO: !!!!!!!!!! Make this work
 */
