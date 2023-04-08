import '@total-typescript/ts-reset';
import { ConfigChecker } from 'configchecker';
import packageJson from './package.json';

export const VERSION = packageJson.version;
export const DEBUG = {
    backgroundPatternPicker: true,
    showGrid: false,
};

const config = ConfigChecker.from(process.env);

/*
TODO: Some equivalent of this which will come from GH actions build
export const VER CEL_GIT_COMMIT_MESSAGE = config.get('VER CEL_GIT_COMMIT_MESSAGE').value;
export const VER CEL_GIT_COMMIT_SHA = config.get('VER CEL_GIT_COMMIT_SHA').value;
*/

export const OPENAI_API_KEY = config.get('OPENAI_API_KEY').value;
