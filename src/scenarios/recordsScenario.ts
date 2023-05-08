import { ScenarioUtils } from '../model/_';
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

        const answer = gptAsk(
            `
                Budu ti dávat záznamy od učitele, ty po každé zprávě odpověz OK dokud ti nepoložím konkrétní otázku.

                Zde je prvních 10 záznamů:

                - Matematika 3.A Celá třída: Žák se seznámí s algoritmem písemného sčítání dvojciferných čísel.
                - Matematika 3.A Celá třída: Většina třídy zvládla úlohy paměťově protože se jednalo o nižší dvojciferná čísla. Už 4 úlohy přišla na to že mají začít sčítat od nejmenšího řádu tedy od jednotek. slabším žákům pomohlo modelovat úlohy na mincích. využili jsme 1korunové a desetikorunové mince.
                - Matematika 3.A Celá třída: Pamětně i písemně sčítá bez problémů.
                - Matematika 3.A Tereza Mojžíšová: Terka má problémy s přechodem. Při sčítání s přechodem jí to dělá problémy jestli stačí začít sčítání od nejmenšího řádu. to jí činí potíže
                - Matematika 3.A Jakub Jurásek: Jakub dobře sčítá pamětně a písemný algoritmus byl pro něj nový. pochopil jej
                - Matematika 3.A Celá třída: Žák vyřeší slovní úlohy se zlomky
                - Matematika 3.A Celá třída: Pro některé žáky bylo obtížné si situaci představit. Museli jsme jít dramatizovat a vizualizovat. Pro žáky kteří si situaci dokázali představit to bylo snadné.
                - Matematika 3.A Celá třída: Petr ukázal svoje řešení na modelu zlomku tyče. Jo ale bylo pro něj obtížné vysvětlit svoje řešení spolužákům. Při vyjadřování se zasekává
                - Matematika 3.A Tereza Mojžíšová: Aby Terezka úlohu pochopila museli jsme zmenšit zadaná čísla.
                - Matematika 3.A Celá třída: Žák vyřeší krokovou rovnici, propojuje jazyk aritmetiky– šipkový a číselný zápis.

                Zatím nic nepiš, pouze čekej na další.
            `,
            `
                Zde je dalších 10 záznamů:

                - Matematika 3.A Celá třída: Petr bez problémů vyřeší krokovou rovnici a přepíše jí do číselného zápisu.
                - Matematika 3.A Tereza Mojžíšová: Terka vyřeší krokovou rovnici jen na krok kovacím pásu. potřebuje ji dramatizovat s číselným zápisem má ještě potíže.
                - Matematika 3.A Jakub Jurásek: Kuba vyřeší krokovou rovnici bez krokovací jeho pásu a s přepisem má ještě potíže.
                - Matematika 3.A Celá třída: Žák vyřeší slovní úlohu s operátory změny.
                - Matematika 3.A Celá třída: Někteří žáci se nechali nachytat na anti signál slovo snědla a odčítali místo sčítání
                - Matematika 3.A Tereza Mojžíšová: Terka se nechala zmást slovem snědla a odčítala místo sčítání
                - Matematika 3.A Jakub Jurásek: Kuba je skvělý čtenář úloze porozuměl a dokázal by vysvětlit i svým spolužákům proč se má sčítat.
                - Matematika 3.A Celá třída: Žák vyřeší slovní úlohu s operátorem porovnání
                - Matematika 3.A Celá třída: Pro většinu třídy byla toto úloha náročná protože pracuje pouze s operátory porovnání. Žákům pomohlo si úlohu nakreslit pomocí úseček. Slabším žákům pomohlo si určit kolik měří Hanka například.
                - Matematika 3.A Celá třída: Žák vyřeší úlohu o zlomcích a modelem zlomků je tyč.
                - Matematika 3.A Celá třída: Peťa má dobrou představu o zlomcích 1/2 1/4 1/3 vyřešil je snadno a rychle.

                Zatím nic nepiš, pouze čekej na další.
            `,
            `
                Zde je dalších 10 záznamů:

                - Matematika 3.A Tereza Mojžíšová: Terka potřebovala pro vyřešení úlohy vytvořit err překreslit úlohu na proužek papíru a pomocí přikládání si vyznačit polovinu a čtvrtinu aby určila zbytek tyče.
                - Matematika 3.A Jakub Jurásek: bylo pro něj snadné určit délku zbytku tyče. orientuje se ve zlomcích polovinách 1/4.
                - Matematika 3.A Celá třída: Žák vyřeší slovní úlohy, která otevírá operaci dělení jako inverzní k násobení.
                - Matematika 3.A Celá třída: S žáky jsme řešili úlohu manipulativně. rozdělovali jsme lentilky a graficky znázorňovaly obsah obdélníků. péťa tyhle strategie nepotřeboval
                - Matematika 3.A Celá třída: Žák poznává znak pro dělení a vytvoří slovní úlohu na dělení.
                - Matematika 3.A Tereza Mojžíšová: Pro terezku je náročné převést slovní úlohu do matematického symbolického jazyka a použít znak pro dělení.
                - Matematika 3.A Celá třída: Žák vyřeší složenou slovní úlohu, ve které bude potřebovat násobit a pak následně sčítat.
                - Matematika 3.A Celá třída: péťa by řešil všechny 3 gradované úlohy a ještě dostal doplňující úlohy na dělení.
                - Matematika 3.A Tereza Mojžíšová: Terezka nedokáže slovní úlohu uchopit čtenářsky a pomohla jí k vyřešení vizualizace obrázkem. Po vizualizaci vyřeší úlohu snadno
                - Matematika 3.A Jakub Jurásek: Kuba využívá strategii vizualizace sám a díky ní vyřeší i náročnější úlohy.
                - Matematika 3.A Celá třída: Žák vyřeší úlohu z antisignálem a poznává vazby mezi násobením a dělením.

                Zatím nic nepiš, pouze čekej na další.
            `,
            `
                Zde je dalších 10 záznamů:

                - Matematika 3.A Celá třída: Pro některé žáky je těžké rozpoznat anti signál. Zdatnější čtenáři si úlohu vizualizují a snadno ji vyřeší. péťa si pokusil svoje řešení představit spolužákům a jeho vyjadřovací schopnosti se posunuli zvládl to lépe.
                - Matematika 3.A Celá třída: Žák rozumí odčítání ve slovních úlohách.
                - Matematika 3.A Tereza Mojžíšová: Terezka díky manipulaci s mincemi dokázala odhalit operátory změny dopočítáním.
                - Matematika 3.A Jakub Jurásek: Kuba úlohu řešil operací odčítáním.
                - Matematika 3.A Celá třída: Žák vyřeší slovní úlohu na odčítání s operátorem změny.
                - Matematika 3.A Celá třída: Pro peťu jsou tyto úlohy velmi jednoduché a odčítání dvojciferných čísel zvládá výborně.
                - Matematika 3.A Tereza Mojžíšová: Terezka už si slovní úlohy vizualizuje kreslí ale stále ještě chybuje v pamětném odčítání dvojciferných čísel.
                - Matematika 3.A Celá třída: Žák vyřeší slovní úlohy na odčítání geometrickém prostředí. Ve větším obdélníku je 120 kachlíků z nich je 19 modrý a 22 zelených. Žák má zjistit kolik z nich je vybarvený kolik není zelených a kolik není vybarvených.
                - Matematika 3.A Celá třída: Žákům nečinila tato úloha potíže. U slabších žáků jsme využili strategii vizualizace. Osvědčilo se i u žáků kterým dělala úloha potíže vrátit se k menším číslům.
                - Matematika 3.A Celá třída: Péťa snadno uchopí úlohu, počítá bezchybně a potřeboval by náročnější úlohy.

                Zatím nic nepiš, pouze čekej na další.
            `,
            `
                Zde je dalších 10 záznamů:

                - Matematika 3.A Celá třída: Žák řeší složenou úlohu a poznává lineární závislost. Má vyřešit úlohu kdy na louce je 7 krav a několik slepic celkem mají 32 nohou. Kolik slepic bude na louce když celkem bude nohou za a 38, za b 48, za c 58?
                - Matematika 3.A Celá třída: Péťa využívá numerické strategie k řešení této úlohy.
                - Matematika 3.A Tereza Mojžíšová: Terka k řešení úlohy využila manipulaci s víčky.
                - Matematika 3.A Jakub Jurásek: Kuba vyřešil úlohu vizualizací když si ji slovní úlohu nakreslil
                - Matematika 3.A Celá třída: dnes jsme se učili písemně odčítat dvojciferná čísla. Většina žáků s tím neměla problém u slabších žáků jsme situaci modelovali na kuličkovém počítadle nebo na mincích.
                - Matematika 3.A Celá třída: My jsme se učili dělit se zbytkem v reálném kontextu. Využili jsme k tomu dramatizaci a hru na molekuly, kdy nějaký žák nebo žáci přebývali
                - Matematika 3.A Celá třída: Dnes jsme pracovali s krychlemi. Žáci měli podle obrázků postavit krychlovou stavbu. Pak se na stavbu dívali shora a měli zakreslit její plán. Propojovali jsme portrét fyzickou stavbu– pohled zepředu a shora. Někteří žáci si stavbu nepotřebovali postavit a viděli to rovnou.
                - Matematika 3.A Celá třída: Dnes jsme ve třídě měřili rozměry různých věcí. Číselné údaje jsme měli zaznamenávat v centimetrech a milimetrech. Některým děti některým dětem dělají potíže převody. 2 cílem bylo zaokrouhlovat naměřené hodnoty na desítky. Dětem pomáhala práce ve skupinách. Ve skupině si mohli svá měření porovnává a společně si pomáhat při zaokrouhlování.
                - Matematika 3.A Celá třída: Dnes jsme propojovali násobení s obsahem obdélníku a čtverce. Pracovali jsme ve dvojicích a žáci se dokázali ve většině případů dohodnout. problematická dvojice byla s Lukášem a Kubou
                - Matematika 3.A Celá třída: Dnes jsme se naučili že násobení má přednost před sčítáním. U slabších žáků jsme násobení barevně vyznačili aby si tuto novou dovednost lépe osvojili.

                Zatím nic nepiš, pouze čekej na další.
            `,
            `
                Zde je dalších 10 záznamů:

                - Matematika 3.A Celá třída: Žák vyřeší slovní úlohu s operátorem porovnání. Žáci budou mít za úkol vyřešit tuto slovní úlohu: Lucka je o 43 milimetrů vyšší než Alena. Pavlína je o 26 milimetrů nižší než Alena. Je vyšší lucka nebo pavlína? O kolik?
                - Matematika 3.A Tereza Mojžíšová: Terezka už sama řeší úlohy strategii vizualizace. To jí pomáhá k vyřešení slo těchto slovních úloh nebo těchto typů slovních úloh
                - Matematika 3.A Celá třída: Dnes jsme se věnovali operaci dělení se zbytkem. Naučili jsme se jak se tento výpočet zapisuje. Slabším žákům porozumění zápisů trvalo.
                - Matematika 3.A Celá třída: Žák vytvoří slovní úlohu na dělení.
                - Matematika 3.A Celá třída: Žáci byli velmi kreativní a tvorba slovních úloh se jim dařila. Jakub Jurásek přicházel s velmi zajímavými kontexty slovní úloh. Žáci pracovali ve dvojicích. Terezce skupinová práce pomohla.
                - Matematika 3.A Celá třída: Dnes jsme řešili úlohy o zlomcích. Pracovali jsme s polovinou a třetinou jako části celku. Využívali jsme k tomu model tyče. Některým žákům činila potíže 1/3.
                - Matematika 3.A Jakub Jurásek: Jakub přišel na to že žlutá ta žlutá část tyče je 1/6 a svoje řešení bravurně předvedl celé třídě. Kuba rád maluje a před třídou to nakreslil na tabuli. To pomohlo ostatním spolužákům porozumět jeho řešení.
                - Matematika 3.A Celá třída: Dnes jsme písemně odčítají trojmístná čísla. Žáci kteří měli potíže u dvojciferných čísel, počítali obtížně i trojmístná čísla. potřebujeme to ještě trénovat.

                Zatím nic nepiš, pouze čekej na otázku.
            `,
            userQuestionText,
        );

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
