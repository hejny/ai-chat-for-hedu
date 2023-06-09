import moment from 'moment';
import { v4 } from 'uuid';
import { IRecord, PUPILS, RecordType } from '../model/__IRecord';

export const MOCKED_RECORDS: Array<IRecord> = [
    {
        id: 'mocked-0',
        lessonDate: '13.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák se seznámí s algoritmem písemného sčítání dvojciferných čísel.',
    },
    {
        id: 'mocked-1',
        lessonDate: '13.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Většina třídy zvládla úlohy paměťově protože se jednalo o nižší dvojciferná čísla. Už 4 úlohy přišla na to že mají začít sčítat od nejmenšího řádu tedy od jednotek. slabším žákům pomohlo modelovat úlohy na mincích. využili jsme 1korunové a desetikorunové mince.',
    },
    {
        id: 'mocked-2',
        lessonDate: '13.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Petr Čech',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Pamětně i písemně sčítá bez problémů.',
    },
    {
        id: 'mocked-3',
        lessonDate: '13.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Tereza Mojžíšová',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content:
            'Terka má problémy s přechodem. Při sčítání s přechodem jí to dělá problémy jestli stačí začít sčítání od nejmenšího řádu. to jí činí potíže',
    },
    {
        id: 'mocked-4',
        lessonDate: '13.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Jakub Jurásek',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Jakub dobře sčítá pamětně a písemný algoritmus byl pro něj nový. pochopil jej',
    },
    {
        id: 'mocked-5',
        lessonDate: '15.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák vyřeší slovní úlohy se zlomky',
    },
    {
        id: 'mocked-6',
        lessonDate: '15.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Pro některé žáky bylo obtížné si situaci představit. Museli jsme jít dramatizovat a vizualizovat. Pro žáky kteří si situaci dokázali představit to bylo snadné.',
    },
    {
        id: 'mocked-7',
        lessonDate: '15.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Petr Čech',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content:
            'Petr ukázal svoje řešení na modelu zlomku tyče. Jo ale bylo pro něj obtížné vysvětlit svoje řešení spolužákům. Při vyjadřování se zasekává',
    },
    {
        id: 'mocked-8',
        lessonDate: '15.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Tereza Mojžíšová',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Aby Terezka úlohu pochopila museli jsme zmenšit zadaná čísla.',
    },
    {
        id: 'mocked-9',
        lessonDate: '20.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák vyřeší krokovou rovnici, propojuje jazyk aritmetiky– šipkový a číselný zápis.',
    },
    {
        id: 'mocked-10',
        lessonDate: '20.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Petr Čech',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content: 'Petr bez problémů vyřeší krokovou rovnici a přepíše jí do číselného zápisu.',
    },
    {
        id: 'mocked-11',
        lessonDate: '20.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Tereza Mojžíšová',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content:
            'Terka vyřeší krokovou rovnici jen na krok kovacím pásu. potřebuje ji dramatizovat s číselným zápisem má ještě potíže.',
    },
    {
        id: 'mocked-12',
        lessonDate: '20.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Jakub Jurásek',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Kuba vyřeší krokovou rovnici bez krokovací jeho pásu a s přepisem má ještě potíže.',
    },
    {
        id: 'mocked-13',
        lessonDate: '22.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák vyřeší slovní úlohu s operátory změny.',
    },
    {
        id: 'mocked-14',
        lessonDate: '22.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content: 'Někteří žáci se nechali nachytat na anti signál slovo snědla a odčítali místo sčítání',
    },
    {
        id: 'mocked-15',
        lessonDate: '22.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Tereza Mojžíšová',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Terka se nechala zmást slovem snědla a odčítala místo sčítání',
    },
    {
        id: 'mocked-16',
        lessonDate: '22.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Jakub Jurásek',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Kuba je skvělý čtenář úloze porozuměl a dokázal by vysvětlit i svým spolužákům proč se má sčítat.',
    },
    {
        id: 'mocked-17',
        lessonDate: '24.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák vyřeší slovní úlohu s operátorem porovnání',
    },
    {
        id: 'mocked-18',
        lessonDate: '24.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Pro většinu třídy byla toto úloha náročná protože pracuje pouze s operátory porovnání. Žákům pomohlo si úlohu nakreslit pomocí úseček. Slabším žákům pomohlo si určit kolik měří Hanka například.',
    },
    {
        id: 'mocked-19',
        lessonDate: '27.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák vyřeší úlohu o zlomcích a modelem zlomků je tyč.',
    },
    {
        id: 'mocked-20',
        lessonDate: '27.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Petr Čech',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Peťa má dobrou představu o zlomcích 1/2 1/4 1/3 vyřešil je snadno a rychle.',
    },
    {
        id: 'mocked-21',
        lessonDate: '27.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Tereza Mojžíšová',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content:
            'Terka potřebovala pro vyřešení úlohy vytvořit err překreslit úlohu na proužek papíru a pomocí přikládání si vyznačit polovinu a čtvrtinu aby určila zbytek tyče.',
    },
    {
        id: 'mocked-22',
        lessonDate: '27.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Jakub Jurásek',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'bylo pro něj snadné určit délku zbytku tyče. orientuje se ve zlomcích polovinách 1/4.',
    },
    {
        id: 'mocked-23',
        lessonDate: '29.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák vyřeší slovní úlohy, která otevírá operaci dělení jako inverzní k násobení.',
    },
    {
        id: 'mocked-24',
        lessonDate: '29.9.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'S žáky jsme řešili úlohu manipulativně. rozdělovali jsme lentilky a graficky znázorňovaly obsah obdélníků. péťa tyhle strategie nepotřeboval',
    },
    {
        id: 'mocked-25',
        lessonDate: '1.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák poznává znak pro dělení a vytvoří slovní úlohu na dělení.',
    },
    {
        id: 'mocked-26',
        lessonDate: '1.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Tereza Mojžíšová',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content:
            'Pro terezku je náročné převést slovní úlohu do matematického symbolického jazyka a použít znak pro dělení.',
    },
    {
        id: 'mocked-27',
        lessonDate: '4.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák vyřeší složenou slovní úlohu, ve které bude potřebovat násobit a pak následně sčítat.',
    },
    {
        id: 'mocked-28',
        lessonDate: '4.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Petr Čech',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'péťa by řešil všechny 3 gradované úlohy a ještě dostal doplňující úlohy na dělení.',
    },
    {
        id: 'mocked-29',
        lessonDate: '4.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Tereza Mojžíšová',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content:
            'Terezka nedokáže slovní úlohu uchopit čtenářsky a pomohla jí k vyřešení vizualizace obrázkem. Po vizualizaci vyřeší úlohu snadno',
    },
    {
        id: 'mocked-30',
        lessonDate: '4.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Jakub Jurásek',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Kuba využívá strategii vizualizace sám a díky ní vyřeší i náročnější úlohy.',
    },
    {
        id: 'mocked-31',
        lessonDate: '6.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák vyřeší úlohu z antisignálem a poznává vazby mezi násobením a dělením.',
    },
    {
        id: 'mocked-32',
        lessonDate: '6.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Pro některé žáky je těžké rozpoznat anti signál. Zdatnější čtenáři si úlohu vizualizují a snadno ji vyřeší. péťa si pokusil svoje řešení představit spolužákům a jeho vyjadřovací schopnosti se posunuli zvládl to lépe.',
    },
    {
        id: 'mocked-33',
        lessonDate: '8.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák rozumí odčítání ve slovních úlohách.',
    },
    {
        id: 'mocked-34',
        lessonDate: '8.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Tereza Mojžíšová',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Terezka díky manipulaci s mincemi dokázala odhalit operátory změny dopočítáním.',
    },
    {
        id: 'mocked-35',
        lessonDate: '8.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Jakub Jurásek',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Kuba úlohu řešil operací odčítáním.',
    },
    {
        id: 'mocked-36',
        lessonDate: '10.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák vyřeší slovní úlohu na odčítání s operátorem změny.',
    },
    {
        id: 'mocked-37',
        lessonDate: '10.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Petr Čech',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Pro peťu jsou tyto úlohy velmi jednoduché a odčítání dvojciferných čísel zvládá výborně.',
    },
    {
        id: 'mocked-38',
        lessonDate: '10.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Tereza Mojžíšová',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content:
            'Terezka už si slovní úlohy vizualizuje kreslí ale stále ještě chybuje v pamětném odčítání dvojciferných čísel.',
    },
    {
        id: 'mocked-39',
        lessonDate: '13.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content:
            'Žák vyřeší slovní úlohy na odčítání geometrickém prostředí. Ve větším obdélníku je 120 kachlíků z nich je 19 modrý a 22 zelených. Žák má zjistit kolik z nich je vybarvený kolik není zelených a kolik není vybarvených.',
    },
    {
        id: 'mocked-40',
        lessonDate: '13.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Žákům nečinila tato úloha potíže. U slabších žáků jsme využili strategii vizualizace. Osvědčilo se i u žáků kterým dělala úloha potíže vrátit se k menším číslům.',
    },
    {
        id: 'mocked-41',
        lessonDate: '13.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Petr Čech',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Péťa snadno uchopí úlohu, počítá bezchybně a potřeboval by náročnější úlohy.',
    },
    {
        id: 'mocked-42',
        lessonDate: '15.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content:
            'Žák řeší složenou úlohu a poznává lineární závislost. Má vyřešit úlohu kdy na louce je 7 krav a několik slepic celkem mají 32 nohou. Kolik slepic bude na louce když celkem bude nohou za a 38, za b 48, za c 58?',
    },
    {
        id: 'mocked-43',
        lessonDate: '15.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Petr Čech',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Péťa využívá numerické strategie k řešení této úlohy.',
    },
    {
        id: 'mocked-44',
        lessonDate: '15.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Tereza Mojžíšová',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Terka k řešení úlohy využila manipulaci s víčky.',
    },
    {
        id: 'mocked-45',
        lessonDate: '15.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Jakub Jurásek',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content: 'Kuba vyřešil úlohu vizualizací když si ji slovní úlohu nakreslil',
    },
    {
        id: 'mocked-46',
        lessonDate: '17.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'dnes jsme se učili písemně odčítat dvojciferná čísla. Většina žáků s tím neměla problém u slabších žáků jsme situaci modelovali na kuličkovém počítadle nebo na mincích.',
    },
    {
        id: 'mocked-47',
        lessonDate: '20.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'My jsme se učili dělit se zbytkem v reálném kontextu. Využili jsme k tomu dramatizaci a hru na molekuly, kdy nějaký žák nebo žáci přebývali',
    },
    {
        id: 'mocked-48',
        lessonDate: '22.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Dnes jsme pracovali s krychlemi. Žáci měli podle obrázků postavit krychlovou stavbu. Pak se na stavbu dívali shora a měli zakreslit její plán. Propojovali jsme portrét fyzickou stavbu– pohled zepředu a shora. Někteří žáci si stavbu nepotřebovali postavit a viděli to rovnou.',
    },
    {
        id: 'mocked-49',
        lessonDate: '24.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Dnes jsme ve třídě měřili rozměry různých věcí. Číselné údaje jsme měli zaznamenávat v centimetrech a milimetrech. Některým děti některým dětem dělají potíže převody. 2 cílem bylo zaokrouhlovat naměřené hodnoty na desítky. Dětem pomáhala práce ve skupinách. Ve skupině si mohli svá měření porovnává a společně si pomáhat při zaokrouhlování.',
    },
    {
        id: 'mocked-50',
        lessonDate: '27.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Dnes jsme propojovali násobení s obsahem obdélníku a čtverce. Pracovali jsme ve dvojicích a žáci se dokázali ve většině případů dohodnout. problematická dvojice byla s Lukášem a Kubou',
    },
    {
        id: 'mocked-51',
        lessonDate: '29.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Dnes jsme se naučili že násobení má přednost před sčítáním. U slabších žáků jsme násobení barevně vyznačili aby si tuto novou dovednost lépe osvojili.',
    },
    {
        id: 'mocked-52',
        lessonDate: '31.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content:
            'Žák vyřeší slovní úlohu s operátorem porovnání. Žáci budou mít za úkol vyřešit tuto slovní úlohu: Lucka je o 43 milimetrů vyšší než Alena. Pavlína je o 26 milimetrů nižší než Alena. Je vyšší lucka nebo pavlína? O kolik?',
    },
    {
        id: 'mocked-53',
        lessonDate: '31.10.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Tereza Mojžíšová',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content:
            'Terezka už sama řeší úlohy strategii vizualizace. To jí pomáhá k vyřešení slo těchto slovních úloh nebo těchto typů slovních úloh',
    },
    {
        id: 'mocked-54',
        lessonDate: '3.11.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Dnes jsme se věnovali operaci dělení se zbytkem. Naučili jsme se jak se tento výpočet zapisuje. Slabším žákům porozumění zápisů trvalo.',
    },
    {
        id: 'mocked-55',
        lessonDate: '10.11.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonGoal',
        content: 'Žák vytvoří slovní úlohu na dělení.',
    },
    {
        id: 'mocked-56',
        lessonDate: '10.11.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Žáci byli velmi kreativní a tvorba slovních úloh se jim dařila. Jakub Jurásek přicházel s velmi zajímavými kontexty slovní úloh. Žáci pracovali ve dvojicích. Terezce skupinová práce pomohla.',
    },
    {
        id: 'mocked-57',
        lessonDate: '12.11.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Dnes jsme řešili úlohy o zlomcích. Pracovali jsme s polovinou a třetinou jako části celku. Využívali jsme k tomu model tyče. Některým žákům činila potíže 1/3.',
    },
    {
        id: 'mocked-58',
        lessonDate: '12.11.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'Jakub Jurásek',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'Note',
        content:
            'Jakub přišel na to že žlutá ta žlutá část tyče je 1/6 a svoje řešení bravurně předvedl celé třídě. Kuba rád maluje a před třídou to nakreslil na tabuli. To pomohlo ostatním spolužákům porozumět jeho řešení.',
    },
    {
        id: 'mocked-59',
        lessonDate: '14.11.2021',
        teacherName: 'Sandra Simerská',
        pupilName: 'všichni',
        lessonClassId: '3.A',
        lessonSubjectId: 'MATH',
        type: 'LessonEvaluation',
        content:
            'Dnes jsme písemně odčítají trojmístná čísla. Žáci kteří měli potíže u dvojciferných čísel, počítali obtížně i trojmístná čísla. potřebujeme to ještě trénovat.',
    },
].map((recordFromSheets) => {
    const { id, lessonDate, lessonClassId, lessonSubjectId, pupilName, type, content } = recordFromSheets;

    const pupilId = pupilName === 'všichni' ? null : PUPILS.findIndex((name) => name === pupilName);
    return {
        id,
        lessonDate: moment(lessonDate, 'DD.MM.YYYY').add(1, 'year').add(5, 'month').add(25, 'days').toDate(),
        lessonClassId,
        lessonSubjectId,
        pupilId,
        type: type as keyof typeof RecordType,
        content,
    };
});

// Note: Add dynamically generated future dates to MOCKED_RECORDS
for (const pupilId of [null, 0, 1, 2]) {
    for (const lessonSubjectId of ['MATH']) {
        for (const lessonClassId of ['3.A']) {
            for (let i = 0; i < 27; i++) {
                const lessonDate = moment().subtract(20, 'day').add(i, 'day').toDate();

                /*
                // Note: Only some lessons for some days are recorded
                if (Math.random() > 0.2) {
                    continue;
                }
                */

                // Note: Skip weekends
                if (moment(lessonDate).isoWeekday() > 5) {
                    continue;
                }

                const add = (type: keyof typeof RecordType) => {
                    // Note: Add only if the record for this date does not exist yet
                    if (
                        !MOCKED_RECORDS.find(
                            (record) =>
                                moment(record.lessonDate).format('D.M.YYYY') ===
                                    moment(lessonDate).format('D.M.YYYY') &&
                                record.lessonClassId === lessonClassId &&
                                record.lessonSubjectId === lessonSubjectId &&
                                record.pupilId === pupilId &&
                                record.type === type,
                        )
                    ) {
                        MOCKED_RECORDS.push({
                            id: v4(),
                            lessonDate,
                            lessonClassId,
                            lessonSubjectId,
                            pupilId,
                            type,
                            content: null,
                        });
                    }
                };

                // Note: Add LessonGoal for each date
                add('LessonGoal');

                // Note: If the date is in the past, add also a LessonEvaluation and a Note
                if (moment().isAfter(lessonDate)) {
                    add('LessonEvaluation');
                    add('Note');
                }
            }
        }
    }
}
