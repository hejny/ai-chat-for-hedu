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
                    Jak se daří Janě Havlíčkové v zeměpisu?
                    \`\`\`
                
                
                `
                : `
                
                    Máš další dotaz?
                `,
        );

        isFirst = false;

        await say('Přemýšlím...');

        const userQuestionText = await userQuestion.content.asPromise();

        await say(
            gptAsk(
                spaceTrim(
                    (block) => `
                        Odpověz na otázku:
                        
                        ${block(userQuestionText)}

                        Zde jsou záznamy na základě kterých odpovíš:
                        ${block(
                            records
                                .map(
                                    ({ lessonClassId, lessonSubjectId, pupilId, content }) =>
                                        `-  ${
                                            lessonSubjectId ? getSubjectName(lessonSubjectId) : ''
                                        } ${lessonClassId} ${
                                            pupilId ? getPupilName(pupilId) : 'Celá třída'
                                        }: ${content}`,
                                )
                                .join('\n'),
                        )}
                    
                    `,
                ),
            ),
        );
    }
}
