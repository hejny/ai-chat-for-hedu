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

    Tvá první zpráva má znít doslova:

    \`\`\`
    ${block(INITIAL_JOURNAL_MESSAGE_TEXT)}
    \`\`\`

    Piš pouze v češtině.
    
    
`,
);

export const INITIAL_TEACHER_MESSAGE_TEXT = spaceTrim(`
    
    Rád bych názorně ukázal pythagorovu větu.
    
`);
