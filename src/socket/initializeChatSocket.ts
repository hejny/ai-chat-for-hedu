import { Socket } from 'socket.io';
import { RunningScenario } from '../model/RunningScenario';
import { recordsScenario } from '../scenarios/recordsScenario';
import { SocketEventMap } from './SocketEventMap';

export async function initializeChatSocket(connection: Socket<SocketEventMap>): Promise<void> {
    const runningScenario = new RunningScenario(recordsScenario, connection);

    connection.on('disconnect', () => {
        /* not await */ runningScenario.destroy();
    });
}

/**
 * TODO: Maybe remove this as separate file
 */
