import { Socket } from 'socket.io';
import { RunningScenario } from '../model/RunningScenario';
import { randomScenario } from '../scenarios/samples/random';
import { SocketEventMap } from './SocketEventMap';

export async function initializeChatSocket(connection: Socket<SocketEventMap>): Promise<void> {
    const runningScenario = new RunningScenario(randomScenario /* <- TODO: !!! Put here lessonScenario */, connection);

    connection.on('disconnect', () => {
        /* not await */ runningScenario.destroy();
    });
}

/**
 * TODO: Maybe remove this as separate file
 */
