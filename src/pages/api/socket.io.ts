import { Server } from 'socket.io';
import { SocketEventMap } from '../../../interfaces/socket';

export default function SocketInitializeHandler(req: any /* <- TODO: NextApiRequest */, res: any, next: any) {
    const io = res.socket.server.io as Server<SocketEventMap>;
    console.log(io);
    //return next();
}
