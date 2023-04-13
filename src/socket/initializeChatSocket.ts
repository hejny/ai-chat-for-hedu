import { Socket } from 'socket.io';
import { RunningScenario } from '../model/RunningScenario';
import { echoScenario } from '../scenarios/samples/echo';
import { SocketEventMap } from './SocketEventMap';

export async function initializeChatSocket(connection: Socket<SocketEventMap>): Promise<void> {
    const runningScenario = new RunningScenario(echoScenario /* <- TODO: !!! Put here lessonScenario */, connection);

    connection.on('disconnect', () => {
        /* not await */ runningScenario.destroy();
    });
}

/**
 * TODO: Maybe remove this as separate file
 */
