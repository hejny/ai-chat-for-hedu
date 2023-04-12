import { Socket } from 'socket.io';
import { SocketEventMap } from '../../interfaces/socket';
import { RunningScenario } from '../model/RunningScenario';
import { beforeLessonScenario } from '../scenarios/10-before-lesson';

export async function initializeChatSocket(connection: Socket<SocketEventMap>): Promise<void> {
    const runningScenario = new RunningScenario(
        beforeLessonScenario,
        connection /* <- TODO: !!! Test also beforeLessonScenario */,
    );

    connection.on('disconnect', () => {
        /* not await */ runningScenario.destroy();
    });
}

/**
 * TODO: Maybe remove this as separate file
 */
