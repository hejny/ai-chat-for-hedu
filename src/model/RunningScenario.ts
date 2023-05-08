import { IDestroyable } from 'destroyable';
import { Destroyable } from 'destroyable/dist/Destroyable';
import { normalizeToKebabCase } from 'n12';
import { Socket } from 'socket.io';
import { SocketEventMap } from '../socket/SocketEventMap';
import { SocketScenarioUtils } from './SocketScenarioUtils';
import { Scenario } from './_';

export class RunningScenario extends Destroyable implements IDestroyable {
    constructor(
        private readonly scenario: Scenario,
        private readonly connection: Socket<Pick<SocketEventMap, 'chatRequest' | 'chatResponse' | 'error'>>,
    ) {
        super();
        /* not await */ this.run();
    }

    private async run() {
        const scenarioUtils = new SocketScenarioUtils(this.connection, normalizeToKebabCase(this.scenario.name));

        try {
            const nextScenario = await this.scenario({
                // TODO: Util to bing every method at once
                say: scenarioUtils.say.bind(scenarioUtils),
                ask: scenarioUtils.ask.bind(scenarioUtils),
                askOptions: scenarioUtils.askOptions.bind(scenarioUtils),
                gptAsk: scenarioUtils.gptAsk.bind(scenarioUtils),
                gptRewrite: scenarioUtils.gptRewrite.bind(scenarioUtils),
                gptSummarize: scenarioUtils.gptSummarize.bind(scenarioUtils),
                load: scenarioUtils.load.bind(scenarioUtils),
                save: scenarioUtils.save.bind(scenarioUtils),
                // <- TODO: Pass here isDestroyed method
            });

            if (nextScenario) {
                this.addSubdestroyable(new RunningScenario(nextScenario, this.connection));
            }
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }

            this.connection.emit('error', error.message);

            // TODO: Self-destroying
        }
    }
}
