import { useTranslation } from 'next-i18next';
import { useEffect, useReducer } from 'react';
import { v4 } from 'uuid';
import {
    ChatMessage,
    CompleteChatMessage,
    JournalChatMessage,
    TeacherChatMessage,
} from '../../../interfaces/chatMessage';
import { Article } from '../../components/Article/Article';
import { Chat } from '../../components/Chat/Chat';
import { Playground, socket } from '../../components/Playground/Playground';
import { Section } from '../../components/Section/Section';
import styles from './Journal.module.css';

export function JournalSection() {
    const { t } = useTranslation();

    const [messages, messagesDispatch] = useReducer(
        (messages: Array<ChatMessage>, action: { type: 'ADD'; message: ChatMessage }) => {
            // TODO: !!! Extract reducer to separate file
            switch (action.type) {
                case 'ADD':
                    return [...messages.filter((message) => message.id !== action.message.id), action.message];

                default:
                    throw new Error(`Unknown action "${action.type}".`);
            }
        },
        [],
    );

    useEffect(() => {
        console.log(`useEffect`, `socket.on chatResponse`);
        // !!! Call off on to listener on useEffect destroy

        const listener = (replyMessage: JournalChatMessage) => {
            console.log('chatResponse', replyMessage.id, replyMessage.content);
            messagesDispatch({ type: 'ADD', message: replyMessage });

            // TODO: !!! Translate to RxJS object
            // TODO: !!! Speech here
            // TODO: !!! Cancel this listener
        };
        socket.on('chatResponse', listener);
        return () => void socket.off('chatResponse', listener);
    });

    return (
        <Section id="Journal" className={styles.JournalSection}>
            <h2>
                <Article content={t('title')} />
            </h2>

            <Playground />

            <Chat
                {...{ messages }}
                onMessage={async (content /* <- TODO: !!! Pass here the message object NOT just text */) => {
                    const myMessage: TeacherChatMessage & CompleteChatMessage = {
                        id: v4(),
                        date: new Date(),
                        from: 'TEACHER',
                        content,
                        isComplete: true,
                    };

                    messagesDispatch({ type: 'ADD', message: myMessage });
                    socket.emit('chatRequest', myMessage);
                }}
            />
            {/*<RecordForm/>*/}
        </Section>
    );
}

/**
 * TODO: Driver to handle sockets
 * TODO: !!! Pick a voice
 * TODO: !!! Voice is working with markdown
 * TODO: !!! Highlite during a speech
 * TODO: !!! Allow to listen
 * TODO: !!! Imitate conversation
 * TODO: !!! Use momentjs for dates
 * TODO: !!! (How) Should be initial message spokem?
 */
