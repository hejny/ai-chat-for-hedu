import moment from 'moment';
import { IRecord } from '../model/__IRecord';

export const MOCKED_RECORDS: Array<IRecord> = [
    {
        lessonDate: moment('2023/05/2').toDate(),
        lessonClassId: '2.A',
        lessonSubjectId: 'MATH',
        pupilId: null,
        type: 'Note',
        content: null,
    },
    {
        lessonDate: moment('2023/04/21').toDate(),
        lessonClassId: '2.A',
        lessonSubjectId: 'HISTORY',
        pupilId: null,
        type: 'Note',
        content:
            'Během této hodiny dějepisu budeme zkoumat starověkou egyptskou civilizaci a její vliv na svět. Podíváme se na jejich sociální, ekonomické a politické struktury a pochopíme, jak přispěly k rozvoji lidské civilizace. Studenti se také dozvědí o faraonech, řece Nil a egyptských hieroglyfech. Budeme diskutovat o důležitosti zachování starověkých artefaktů a dozvíme se o výzvách, kterým čelí archeologové při odhalování tajemství starověkých civilizací.',
        contentSummarized:
            'Tato hodina dějepisu bude zkoumat starověkou egyptskou civilizaci a její vliv na svět. Podíváme se na jejich sociální, ekonomické a politické struktury a pochopíme, jak přispěly k rozvoji lidské civilizace.',
    },
    {
        lessonDate: moment('2023/04/22').toDate(),
        lessonClassId: '3.B',
        lessonSubjectId: 'SCIENCE',
        pupilId: null,
        type: 'Note',
        content:
            'V této hodině přírodopisu se budeme učit o různých skupenstvích látek a jejich vlastnostech. Budeme zkoumat charakteristiky pevných látek, kapalin a plynů a pochopíme, jak se chovají různě za různých podmínek. Studenti se také dozvědí o konceptu energie a její roli v chování látek. Provedeme experimenty k pozorování změn látek a diskutujeme o praktických aplikacích našeho porozumění látkám a energii ve skutečném světě.',
        contentSummarized:
            'Tato hodina přírodopisu se bude zaměřovat na různá skupenství látek a jejich vlastnosti. Budeme zkoumat charakteristiky pevných látek, kapalin a plynů a provádět experimenty k pozorování změn látek.',
    },
    {
        lessonDate: moment('2023/04/23').toDate(),
        lessonClassId: '4.C',
        lessonSubjectId: 'ENGLISH_LANGUAGE',
        pupilId: null,
        type: 'Note',
        content:
            'During this English lesson, we will focus on developing the students’ reading comprehension skills. We will read and analyze a short story, focusing on the plot, character development, and theme. We will also discuss literary devices such as foreshadowing, symbolism, and imagery. Students will practice critical thinking skills by making connections between the story and their own experiences, and by analyzing the story from different perspectives.',
        contentSummarized:
            'This English lesson will focus on developing students’ reading comprehension skills through analyzing a short story and discussing literary devices.',
    },
    {
        lessonDate: moment('2023/04/27').toDate(),
        lessonClassId: '2.B',
        lessonSubjectId: 'PHYSICS',
        pupilId: null,
        type: 'Note',
        content:
            'V této hodině fyziky se budeme učit o zákonech pohybu. Budeme diskutovat o Newtonových zákonech a jak mohou být aplikovány na různé situace. Studenti se dozví o různých silách, které působí na předměty a jak se tyto síly mohou lišit v závislosti na okolnostech. Provedeme také experimenty, abychom si mohli lépe představit, jak funguje pohyb pod vlivem různých sil. Na konci hodiny budeme mít krátkou diskuzi o významu zákonů pohybu a jak mohou být použity v každodenním životě.',
        contentSummarized:
            'V této hodině fyziky se budeme učit o zákonech pohybu a diskutovat o jejich aplikaci na různé situace. Provedeme experimenty, abychom si lépe představili pohyb pod vlivem různých sil a diskutujeme o významu zákonů pohybu v každodenním životě.',
    },
    {
        lessonDate: moment('2023/04/28').toDate(),
        lessonClassId: '2.B',
        lessonSubjectId: 'GEOGRAPHY',
        pupilId: null,
        type: 'Note',
        content:
            'V této hodině zeměpisu budeme studovat klimatické zóny a biomy naší planety. Pochopíme, jaké faktory ovlivňují klima a rozmístění živých organismů. Studenti se také dozví o ochraně biotopů a biodiverzitě. Diskutujeme o tom, jaké jsou příčiny a dopady změny klimatu na život naší planety a jaký je naše odpovědnost vůči ochraně našeho životního prostředí.',
        contentSummarized:
            'Tato hodina zeměpisu bude věnována studiu klimatických zón a biotopů naší planety, a diskutovat o ochraně biodiverzity a ochraně našeho životního prostředí před změnami klimatu.',
    },

    // Note: From this point records are just Ctrl+C/V from non-pupil ones

    {
        lessonDate: moment('2023/04/21').toDate(),
        lessonClassId: '2.A',
        lessonSubjectId: 'HISTORY',
        pupilId: 1,
        type: 'Note',
        content:
            'Žák Během této hodiny dějepisu budeme zkoumat starověkou egyptskou civilizaci a její vliv na svět. Podíváme se na jejich sociální, ekonomické a politické struktury a pochopíme, jak přispěly k rozvoji lidské civilizace. Studenti se také dozvědí o faraonech, řece Nil a egyptských hieroglyfech. Budeme diskutovat o důležitosti zachování starověkých artefaktů a dozvíme se o výzvách, kterým čelí archeologové při odhalování tajemství starověkých civilizací.',
        contentSummarized:
            'Žák Tato hodina dějepisu bude zkoumat starověkou egyptskou civilizaci a její vliv na svět. Podíváme se na jejich sociální, ekonomické a politické struktury a pochopíme, jak přispěly k rozvoji lidské civilizace.',
    },
    {
        lessonDate: moment('2023/04/22').toDate(),
        lessonClassId: '3.B',
        lessonSubjectId: 'SCIENCE',
        pupilId: 1,
        type: 'Note',
        content:
            'Žák V této hodině přírodopisu se budeme učit o různých skupenstvích látek a jejich vlastnostech. Budeme zkoumat charakteristiky pevných látek, kapalin a plynů a pochopíme, jak se chovají různě za různých podmínek. Studenti se také dozvědí o konceptu energie a její roli v chování látek. Provedeme experimenty k pozorování změn látek a diskutujeme o praktických aplikacích našeho porozumění látkám a energii ve skutečném světě.',
        contentSummarized:
            'Žák Tato hodina přírodopisu se bude zaměřovat na různá skupenství látek a jejich vlastnosti. Budeme zkoumat charakteristiky pevných látek, kapalin a plynů a provádět experimenty k pozorování změn látek.',
    },
    {
        lessonDate: moment('2023/04/23').toDate(),
        lessonClassId: '4.C',
        lessonSubjectId: 'ENGLISH_LANGUAGE',
        pupilId: 2,
        type: 'Note',
        content:
            'Žák During this English lesson, we will focus on developing the students’ reading comprehension skills. We will read and analyze a short story, focusing on the plot, character development, and theme. We will also discuss literary devices such as foreshadowing, symbolism, and imagery. Students will practice critical thinking skills by making connections between the story and their own experiences, and by analyzing the story from different perspectives.',
        contentSummarized:
            'Žák This English lesson will focus on developing students’ reading comprehension skills through analyzing a short story and discussing literary devices.',
    },
    {
        lessonDate: moment('2023/04/27').toDate(),
        lessonClassId: '2.B',
        lessonSubjectId: 'PHYSICS',
        pupilId: 3,
        type: 'Note',
        content:
            'Žák V této hodině fyziky se budeme učit o zákonech pohybu. Budeme diskutovat o Newtonových zákonech a jak mohou být aplikovány na různé situace. Studenti se dozví o různých silách, které působí na předměty a jak se tyto síly mohou lišit v závislosti na okolnostech. Provedeme také experimenty, abychom si mohli lépe představit, jak funguje pohyb pod vlivem různých sil. Na konci hodiny budeme mít krátkou diskuzi o významu zákonů pohybu a jak mohou být použity v každodenním životě.',
        contentSummarized:
            'Žák V této hodině fyziky se budeme učit o zákonech pohybu a diskutovat o jejich aplikaci na různé situace. Provedeme experimenty, abychom si lépe představili pohyb pod vlivem různých sil a diskutujeme o významu zákonů pohybu v každodenním životě.',
    },
    {
        lessonDate: moment('2023/04/28').toDate(),
        lessonClassId: '2.B',
        lessonSubjectId: 'GEOGRAPHY',
        pupilId: 3,
        type: 'Note',
        content:
            'Žák V této hodině zeměpisu budeme studovat klimatické zóny a biomy naší planety. Pochopíme, jaké faktory ovlivňují klima a rozmístění živých organismů. Studenti se také dozví o ochraně biotopů a biodiverzitě. Diskutujeme o tom, jaké jsou příčiny a dopady změny klimatu na život naší planety a jaký je naše odpovědnost vůči ochraně našeho životního prostředí.',
        contentSummarized:
            'Žák Tato hodina zeměpisu bude věnována studiu klimatických zón a biotopů naší planety, a diskutovat o ochraně biodiverzity a ochraně našeho životního prostředí před změnami klimatu.',
    },

    {
        lessonDate: moment('2023/04/21').toDate(),
        lessonClassId: '2.A',
        lessonSubjectId: 'HISTORY',
        pupilId: 3,
        type: 'Note',
        content:
            'Žák Během této hodiny dějepisu budeme zkoumat starověkou egyptskou civilizaci a její vliv na svět. Podíváme se na jejich sociální, ekonomické a politické struktury a pochopíme, jak přispěly k rozvoji lidské civilizace. Studenti se také dozvědí o faraonech, řece Nil a egyptských hieroglyfech. Budeme diskutovat o důležitosti zachování starověkých artefaktů a dozvíme se o výzvách, kterým čelí archeologové při odhalování tajemství starověkých civilizací.',
        contentSummarized:
            'Žák Tato hodina dějepisu bude zkoumat starověkou egyptskou civilizaci a její vliv na svět. Podíváme se na jejich sociální, ekonomické a politické struktury a pochopíme, jak přispěly k rozvoji lidské civilizace.',
    },
    {
        lessonDate: moment('2023/04/22').toDate(),
        lessonClassId: '3.B',
        lessonSubjectId: 'SCIENCE',
        pupilId: 0,
        type: 'Note',
        content:
            'Žák V této hodině přírodopisu se budeme učit o různých skupenstvích látek a jejich vlastnostech. Budeme zkoumat charakteristiky pevných látek, kapalin a plynů a pochopíme, jak se chovají různě za různých podmínek. Studenti se také dozvědí o konceptu energie a její roli v chování látek. Provedeme experimenty k pozorování změn látek a diskutujeme o praktických aplikacích našeho porozumění látkám a energii ve skutečném světě.',
        contentSummarized:
            'Žák Tato hodina přírodopisu se bude zaměřovat na různá skupenství látek a jejich vlastnosti. Budeme zkoumat charakteristiky pevných látek, kapalin a plynů a provádět experimenty k pozorování změn látek.',
    },
    {
        lessonDate: moment('2023/04/23').toDate(),
        lessonClassId: '4.C',
        lessonSubjectId: 'ENGLISH_LANGUAGE',
        pupilId: 4,
        type: 'Note',
        content:
            'Žák During this English lesson, we will focus on developing the students’ reading comprehension skills. We will read and analyze a short story, focusing on the plot, character development, and theme. We will also discuss literary devices such as foreshadowing, symbolism, and imagery. Students will practice critical thinking skills by making connections between the story and their own experiences, and by analyzing the story from different perspectives.',
        contentSummarized:
            'Žák This English lesson will focus on developing students’ reading comprehension skills through analyzing a short story and discussing literary devices.',
    },
    {
        lessonDate: moment('2023/04/27').toDate(),
        lessonClassId: '2.B',
        lessonSubjectId: 'PHYSICS',
        pupilId: 5,
        type: 'Note',
        content:
            'Žák V této hodině fyziky se budeme učit o zákonech pohybu. Budeme diskutovat o Newtonových zákonech a jak mohou být aplikovány na různé situace. Studenti se dozví o různých silách, které působí na předměty a jak se tyto síly mohou lišit v závislosti na okolnostech. Provedeme také experimenty, abychom si mohli lépe představit, jak funguje pohyb pod vlivem různých sil. Na konci hodiny budeme mít krátkou diskuzi o významu zákonů pohybu a jak mohou být použity v každodenním životě.',
        contentSummarized:
            'Žák V této hodině fyziky se budeme učit o zákonech pohybu a diskutovat o jejich aplikaci na různé situace. Provedeme experimenty, abychom si lépe představili pohyb pod vlivem různých sil a diskutujeme o významu zákonů pohybu v každodenním životě.',
    },
    {
        lessonDate: moment('2023/04/28').toDate(),
        lessonClassId: '2.B',
        lessonSubjectId: 'GEOGRAPHY',
        pupilId: 1,
        type: 'Note',
        content:
            'Žák V této hodině zeměpisu budeme studovat klimatické zóny a biomy naší planety. Pochopíme, jaké faktory ovlivňují klima a rozmístění živých organismů. Studenti se také dozví o ochraně biotopů a biodiverzitě. Diskutujeme o tom, jaké jsou příčiny a dopady změny klimatu na život naší planety a jaký je naše odpovědnost vůči ochraně našeho životního prostředí.',
        contentSummarized:
            'Žák Tato hodina zeměpisu bude věnována studiu klimatických zón a biotopů naší planety, a diskutovat o ochraně biodiverzity a ochraně našeho životního prostředí před změnami klimatu.',
    },
];

// Note: Add dynamically generated future dates to MOCKED_RECORDS

for (const pupilId of [null, 0, 1, 2, 3, 4, 5, 6]) {
    for (const lessonSubjectId of ['ENGLISH_LANGUAGE', 'PHYSICS', 'GEOGRAPHY', 'SCIENCE']) {
        for (const lessonClassId of ['2.B', '3.B', '4.C']) {
            for (let i = 0; i < 27; i++) {
                const lessonDate = moment().subtract(20, 'day').add(i, 'day').toDate();

                // Note: Only some lessons for some days are recorded
                if (Math.random() > 0.2) {
                    continue;
                }

                // Note: Add LessonGoal for each date
                MOCKED_RECORDS.push({
                    lessonDate,
                    lessonClassId,
                    lessonSubjectId,
                    pupilId,
                    type: 'LessonGoal',
                    content: null,
                });

                // Note: If the date is in the past, add also a LessonEvaluation and a Note
                if (moment().isAfter(lessonDate)) {
                    MOCKED_RECORDS.push({
                        lessonDate,
                        lessonClassId,
                        lessonSubjectId,
                        pupilId,
                        type: 'LessonEvaluation',
                        content: null,
                    });

                    MOCKED_RECORDS.push({
                        lessonDate,
                        lessonClassId,
                        lessonSubjectId,
                        pupilId,
                        type: 'Note',
                        content: null,
                    });
                }
            }
        }
    }
}
