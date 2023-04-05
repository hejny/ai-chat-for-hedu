import '@total-typescript/ts-reset';
import { ConfigChecker } from 'configchecker';
import spaceTrim from 'spacetrim';
import packageJson from './package.json';

export const VERSION = packageJson.version;
export const DEBUG = {
    backgroundPatternPicker: true,
    showGrid: false,
};

const config = ConfigChecker.from(process.env);

export const VERCEL_GIT_COMMIT_MESSAGE = config.get('VERCEL_GIT_COMMIT_MESSAGE').value;
export const VERCEL_GIT_COMMIT_SHA = config.get('VERCEL_GIT_COMMIT_SHA').value;

export const OPENAI_API_KEY = config.get('OPENAI_API_KEY').value;

export const INITIAL_JOURNAL_MESSAGE_TEXT = spaceTrim(`

    Jaký máš cíl dnešní hodiny matematiky?
    
`);

export const INITIAL_SHEM_MESSAGE_TEXT = spaceTrim(
    (block) => `

    Jsi zkušený učitel na české základní škole, který radí ostatním učitelům a pomáhá jim s reflexí výuky.
    Drž se pravidel:
    - Dávej praktické rady
    - Piš stručně a jasně
    - Neraď v konkrétních tématech, zjišťuješ informace
    - Piš pouze v češtině
    - Dodržuj níže popsaný scénář konverzace

    Tvá první zpráva má znít doslova:

    \`\`\`
    ${block(INITIAL_JOURNAL_MESSAGE_TEXT)}
    \`\`\`

    Poté následuj scénář:

    1) ${INITIAL_JOURNAL_MESSAGE_TEXT}
    2) Jaké úlohy plánuješ dnes zadat žákům z učebnice?
    3) Co s nimi plánuješ dělat dál mimo učebnici?
    4) Zkus se dnes soustředit více na žáka X
    
` /* <- TODO: !!! Allow to describe a scenario here */,
);

export const INITIAL_TEACHER_MESSAGE_TEXT = spaceTrim(`
    
    Rád bych názorně ukázal pythagorovu větu.
    
`);

/*

TODO:



Omezujeme se v prototypu na hodiny matematiky a jednu třídu
V databázi máme relace 
třída: učitel - žáci
ník: záznam (učitel, žák (volitelně), txt) 

—
před hodinou:
AI (ideálně voiceover): Jaký máš cíl dnešní hodiny matematiky?
Průvodce: přepsaná odpověď zaznamenána do deníku (databáze) s časovým razítkem v původní podobě + AI přeformulovaná odpověď ve smyslu odpovědi na otázku “Co bylo cílem dnešní hodiny matematiky učitele?” + typ “cíle hodiny”
AI: Jaké úlohy plánuješ dnes zadat žákům z učebnice?
P: záznam typu “primární učební materiál”
AI: Co s nimi plánuješ dělat dál mimo učebnici?
P: záznam typu “sekundární učební materiál”
AI: Zkus se dnes soustředit více na žáka X
—
po hodině:
AI: Dneska jsi měl za cíl/e xy. Jak s Ti ho podařilo naplnit? (v případě, že se nepodaří cíl jasně zanalizovat, může být jen obecná otázka jak se podařilo dnešní cíle naplnit)
AI: Stihl jsi vsechno co sis naplánoval?
(if ne): proč jsi to nestihl?
(if rozpoznám že stihl): AI: Super (a na obrazovce se objeví palec nahoru)
(else): Dobře.
AI: Zařadil jsi něco navíc?
(když neřekne protože) AI: Proč?
AI: co Tě na hodině překvapilo?
P: (pokud zmíní žáka, přiřadí v db záznam i k žákovi)
AI: Jak si vedl žák X?
P: záznam si k sobě dá i žáka
AI: Chceš si ještě něco k této hodině zaznamenat?

Rozhraní:
Seznam dnů kdy je nějaký záznam v deníku s proklikem na strukturovaný zápis deníku z daného dne
Seznam žáků s prokliky: chronologický zápis, “slovní hodnocení” - v čem je dobrý, na čem by potřeboval zapracovat, ideálně kdyby to dokázalo zanalyzovat zápisy učitele a zjistit, o s žák učil 




*/
