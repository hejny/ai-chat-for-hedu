import { ScenarioUtils } from '../model/_';

export async function afterLessonScenario({
    load,
    ask,
    gptRewrite: rewrite,
    gptSummarize: summarize,
    save,
    say,
}: ScenarioUtils): Promise<void> {
    const { lessonPlan } = await load('lessonPlan');

    const planResult = await ask(
        rewrite(
            !lessonPlan
                ? `Jak se podařilo dnešní cíle naplnit?`
                : `Dneska jsi měl za cíl ${await summarize(
                      lessonPlan,
                  ).content.asPromise()}. Jak s Ti ho podařilo naplnit?`,
        ),
    );
    await save({ planResult });

    const isPlanDone = await ask(
        /*<- TODO: use askBoolean or askOptions*/ rewrite(`Stihl jsi vsechno co sis naplánoval?`),
    );
    await save({ isPlanDone });

    if (await isPlanDone.content.asBoolean()) {
        await say('👍' /* <- TODO: Use Openmoji */);
    } else {
        await say('Dobře');
    }

    const extra = await ask(rewrite(`Zařadil jsi něco navíc?`));
    await save({ extra });

    if (!(await extra.content.asBoolean())) {
        const reasonForNoExtra = await ask(rewrite(`Proč?`));
        await save({ reasonForNoExtra });
    }

    const surprise = await ask(rewrite(`Co Tě na hodině překvapilo?`));

    await save({ surprise } /* <- TODO: pokud zmíní žáka, přiřadí v db záznam i k žákovi */);

    const studentResult = await ask(rewrite(`Jak si vedl žák X?` /* <- TODO: Replace X by specific student */));
    await save({ studentResult });

    // TODO: ??? záznam si k sobě dá i žáka

    const note = await ask(rewrite(`Chceš si ještě něco k této hodině zaznamenat?`));
    await save({ note });
}
