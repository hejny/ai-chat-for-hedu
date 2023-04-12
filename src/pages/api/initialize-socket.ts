import { faker } from '@faker-js/faker';
import chalk from 'chalk';
import { Server } from 'socket.io';
import { forTime } from 'waitasecond';
import { SocketEventMap } from '../../../interfaces/socket';
import { initializeChatSocket } from '../../socket/initializeChatSocket';









export default function SocketInitializeHandler(req: any /* <- TODO: NextApiRequest */, res: any) {
    if (res.socket.server.io) {
        return res.send(`Socket.IO is already initialized`);
    }

    console.log(chalk.green('Socket is initializing'));
    const io = new Server<SocketEventMap>(res.socket.server, { path: '/api/socket.io' });

    res.socket.server.io = io;

    io.on('connection', (connection) => {
        console.log('connection');

        (async () => {
            console.log('Starting test');
            while (true) {
                await forTime(1000);
                connection.emit('test', faker.hacker.abbreviation());
            }
        })();

        /* not await */ initializeChatSocket(connection);
    });

    return res.send(`Socket.IO is newly initialized`);
}
