import { Socket } from 'socket.io';
import { SocketEventMap } from '../../interfaces/socket';
import { RunningScenario } from '../model/RunningScenario';
import { infiniteScenario } from '../scenarios/samples/infinite';

export async function initializeChatSocket(connection: Socket<SocketEventMap>): Promise<void> {
    const runningScenario = new RunningScenario(
        infiniteScenario /* <- TODO: !!! Put here lessonScenario */,
        connection,
    );

    connection.on('disconnect', () => {
        /* not await */ runningScenario.destroy();
    });
}

/**
 * TODO: Maybe remove this as separate file
 */
