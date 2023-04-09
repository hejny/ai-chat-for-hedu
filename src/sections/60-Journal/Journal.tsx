import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { ChatMessage, CompleteChatMessage, TeacherChatMessage } from '../../../interfaces/chatMessage';
import { Article } from '../../components/Article/Article';
import { Chat } from '../../components/Chat/Chat';
import { Playground, socket } from '../../components/Playground/Playground';
import { Section } from '../../components/Section/Section';
import styles from './Journal.module.css';

export function JournalSection() {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<Array<ChatMessage>>([]);

    return (
        <Section id="Journal" className={styles.JournalSection}>
            <h2>
                <Article content={t('title')} />
            </h2>

            <Playground />

            <Chat
                messages={messages}
                onMessage={async (content /* <- TODO: !!! Pass here the message object NOT just text */) => {
                    const myMessage: TeacherChatMessage & CompleteChatMessage = {
                        date: new Date(),
                        from: 'TEACHER',
                        content,
                        isComplete: true,
                    };

                    setMessages([...messages, myMessage]);

                    // TODO: Driver to handle this

                    socket.emit('chatRequest', myMessage);
                    socket.on('chatResponse', (replyMessage) => {
                        setMessages([...messages, myMessage, replyMessage]);

                        // TODO: !!! Translate to RxJS object
                        // TODO: !!! Speech here
                        // TODO: !!! Cancel this listener
                    });
                }}
            />
            {/*<RecordForm/>*/}
        </Section>
    );
}

/**
 * TODO: !!! Pick a voice
 * TODO: !!! Voice is working with markdown
 * TODO: !!! Highlite during a speech
 * TODO: !!! Allow to listen
 * TODO: !!! Imitate conversation
 * TODO: !!! Use momentjs for dates
 * TODO: !!! (How) Should be initial message spokem?
 */
