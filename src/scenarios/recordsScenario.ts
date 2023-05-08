import { ScenarioUtils } from '../model/_';
import { getRecords } from '../pages/api/utils/getRecords';

export async function recordsScenario({ load, ask, rewrite, summarize, save, say }: ScenarioUtils): Promise<void> {
    const records = (await getRecords()).filter(({ content }) => content);

    let isFirst = true;
    while (true) {
        const question = await ask(
            isFirst
                ? `
                    Zeptej se na cokoliv ohledně tvých ${records.length} záznamů a já ti pomohu.

                    Například:

                    \`\`\`
                    Jak se daří Janě Havlíčkové? v matematice?
                    \`\`\`
                
                
                `
                : `
                
                    Máš další dotaz?
                `,
        );

        isFirst = false;

        await say('Přemýšlím...');
    }
}
