import { normalizeToKebabCase } from 'n12';
import { Socket } from 'socket.io';
import { SocketEventMap } from '../../interfaces/socket';
import { SocketScenarioUtils } from '../model/SocketScenarioUtils';
import { Scenario } from '../model/_';
import { beforeLessonScenario } from '../scenarios/10-before-lesson';

export async function initializeChatSocket(connection: Socket<SocketEventMap>): Promise<void> {
    const scenario: Scenario = beforeLessonScenario; /* <- TODO: !!! Test also beforeLessonScenario */
    const scenarioUtils = new SocketScenarioUtils(connection, normalizeToKebabCase(beforeLessonScenario.name));

    try {
        await scenario({
            // TODO: Util to bing every method at once
            say: scenarioUtils.say.bind(scenarioUtils),
            ask: scenarioUtils.ask.bind(scenarioUtils),
            rewrite: scenarioUtils.rewrite.bind(scenarioUtils),
            summarize: scenarioUtils.summarize.bind(scenarioUtils),
            load: scenarioUtils.load.bind(scenarioUtils),
            save: scenarioUtils.save.bind(scenarioUtils),
        });
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        connection.emit('error', error.message);
    }
}

/*
    TODO: [🧶] util streamMessage

    (async () => {
        const words = [];
        for (const word of splitWords(INITIAL_JOURNAL_MESSAGE_TEXT)) {
            if (isDestroyed) {
                return;
            }
            await forTime(100);

            words.push(word);

            initialMessage.content = joinWords(words);
            setMessages([initialMessage]);
        }
    })();

*/

/**
 * TODO: [🥽] It is but ugly-prectise to name summarize and rewrite by same name as standalone functions and also a methods of ScenarioUtils - figure out two sets of unique names
 */
