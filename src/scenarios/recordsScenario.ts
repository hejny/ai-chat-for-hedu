import spaceTrim from 'spacetrim';
import { ScenarioUtils } from '../model/_';
import { getPupilName, getSubjectName } from '../model/__IRecord';
import { getRecords } from '../pages/api/utils/getRecords';

export async function recordsScenario({
    load,
    ask,
    gptAsk,
    gptRewrite,
    gptSummarize,
    save,
    say,
}: ScenarioUtils): Promise<void> {
    const records = (await getRecords()).filter(({ content }) => content);

    let isFirst = true;
    while (true) {
        const userQuestion = await ask(
            isFirst
                ? `
                    Zeptej se na cokoliv ohledně tvých ${records.length} záznamů a já ti pomohu.

                    Například:

                    \`\`\`
                    Jak se daří Tereze v Matematice?
                    \`\`\`
                
                
                `
                : `
                
                    Máš další dotaz?
                `,
        );

        isFirst = false;

        await say('Přemýšlím...');

        const userQuestionText = await userQuestion.content.asPromise();

        const recordsTexts = records.map(
            ({ lessonClassId, lessonSubjectId, pupilId, content }) =>
                `- ${lessonSubjectId ? getSubjectName(lessonSubjectId) : ''} ${lessonClassId} ${
                    pupilId ? getPupilName(pupilId) : 'Celá třída'
                }: ${content}`,
        );

        // Split recordsTexts into chunks of 10
        const recordsTextsChunks = recordsTexts.reduce((acc, recordText, index) => {
            const chunkIndex = Math.floor(index / 10);
            acc[chunkIndex] = [...(acc[chunkIndex] || []), recordText];
            return acc;
        }, [] as Array<Array<string>>);

        const messagesToAsk = recordsTextsChunks.map((records, i) => {
            if (i === 0) {
                return spaceTrim(
                    (block) => `
                
                        Budu ti dávat záznamy od učitele, ty po každé zprávě odpověz OK dokud ti nepoložím konkrétní otázku.

                        Zde je prvních 10 záznamů:
        
                        ${block(records.join('\n'))}
        
                        Zatím nic nepiš, pouze čekej na další.
                    `,
                );
            } else if (i !== recordsTextsChunks.length - 1) {
                return spaceTrim(
                    (block) => `
                
                        Zde je dalších 10 záznamů:
        
                        ${block(records.join('\n'))}
        
                        Zatím nic nepiš, pouze čekej na další.
                    `,
                );
            } else {
                return spaceTrim(
                    (block) => `
                
                        Zde je posledních ${records.length} záznamů:

                        ${block(records.join('\n'))}
        
                        Zatím nic nepiš, pouze čekej na otázku.
                    `,
                );
            }
        });

        const answer = gptAsk(...messagesToAsk, userQuestionText);

        await say(answer);

        /*
        await say(
            gptAsk(
                spaceTrim(
                    (block) => `
       
                                    ${block(
                                        records
                                            // .filter(({ lessonSubjectId }) => lessonSubjectId === 'GEOGRAPHY')
                                            /*
                                            .filter(
                                                ({ pupilId }) =>
                                                    pupilId === PUPILS.findIndex((name) => name === `Tereza Mojžíšová`),
                                            )
                                            * /
                                            .map(
                                                ({ lessonClassId, lessonSubjectId, pupilId, content }) =>
                                                    `- ${
                                                        lessonSubjectId ? getSubjectName(lessonSubjectId) : ''
                                                    } ${lessonClassId} ${
                                                        pupilId ? getPupilName(pupilId) : 'Celá třída'
                                                    }: ${content}`,
                                            )
                                            .join('\n'),
                                    )}

                                    ---

                                    ${block(userQuestionText)}
                                
                                `,
                ),
            ),
        );
        */
    }
}
