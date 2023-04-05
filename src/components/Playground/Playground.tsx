import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import styles from './Playground.module.css';
let socket: Socket;

interface PlaygroundProps {}

export function Playground(props: PlaygroundProps) {
    const {} = props;

    const [message, setMessage] = useState('Initial');

    useEffect(() => socketInitializer() as any, []);

    const socketInitializer = () => {
        /* await */ fetch('/api/chat-socket');
        socket = io(/*{ path: '/api/chat-socket/' }*/);

        console.log({ socket });

        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on('message', (message) => {
            setMessage(message);
        });

        return () => {
            console.log('destroy !!!');
        };
    };

    return <div className={styles.Playground}>{message}</div>;
}
