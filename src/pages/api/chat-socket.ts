import { faker } from '@faker-js/faker';
import { Server } from 'socket.io';
import { forTime } from 'waitasecond';

const SocketHandler = (req: any, res: any) => {
    if (res.socket.server.io) {
        console.log('Socket is already running');
    } else {
        console.log('Socket is initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connection', async (connection) => {
            console.log('connection');
            while (true) {
                await forTime(1000);
                console.log('message');
                connection.emit('message', faker.hacker.abbreviation());
            }
        });
    }
    res.end();
};

export default SocketHandler;

/**
 * TODO: !!! Rename endpoint to chat
 */
