import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SocketEventMap } from '../../../interfaces/socket';
import styles from './Playground.module.css';

/**
 * TODO: !!! Make Better - ask
 */
export let socket: Socket<SocketEventMap>;

interface PlaygroundProps {}

export function Playground(props: PlaygroundProps) {
    const {} = props;

    const [nonce, setNonce] = useState('Hello');

    useEffect(() => socketInitializer() as any, []);

    const socketInitializer = () => {
        /* await */ fetch('/api/initialize-socket');
        socket = io({ path: '/api/socket.io' });

        console.log({ socket });

        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on('test', (nonce) => {
            setNonce(nonce);
        });

        socket.on('error', (errorMessage) => {
            console.error(errorMessage);
            alert(errorMessage /* <- TODO: Do not use blocking code */);
        });

        return () => {
            console.log('!!! destroy !!!');
        };
    };

    return <div className={styles.Playground}>{nonce}</div>;
}

/**
 * TODO: Better place for initialization of socket.io on client
 */
