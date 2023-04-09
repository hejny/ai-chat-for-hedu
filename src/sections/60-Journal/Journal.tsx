import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { forTime } from 'waitasecond';
import { INITIAL_JOURNAL_MESSAGE_TEXT } from '../../../config';
import { AliceChatMessage, BotChatMessage, ChatMessage, CompleteChatMessage } from '../../../interfaces/chatMessage';
import { Article } from '../../components/Article/Article';
import { Chat } from '../../components/Chat/Chat';
import { Playground, socket } from '../../components/Playground/Playground';
import { Section } from '../../components/Section/Section';
import { joinWords } from '../../utils/joinWords';
import { splitWords } from '../../utils/splitWords';
import styles from './Journal.module.css';

export function JournalSection() {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<Array<ChatMessage>>([]);

    useEffect(() => {
        const initialMessage = {
            messageId: 'INITIAL',
            date: new Date(),
            from: 'JOURNAL',
            content: '',
            isComplete: true,
        } satisfies BotChatMessage;

        let isDestroyed = false;
        (async () => {
            const words = [];
            for (const word of splitWords(INITIAL_JOURNAL_MESSAGE_TEXT)) {
                if (isDestroyed) {
                    return;
                }
                await forTime(100);

                words.push(word);

                initialMessage.content = joinWords(words);
                setMessages([initialMessage]);
            }
        })();

        return () => void (isDestroyed = true);
    }, []);

    return (
        <Section id="Journal" className={styles.JournalSection}>
            <h2>
                <Article content={t('title')} />
            </h2>

            <Playground />

            <Chat
                messages={messages}
                onMessage={async (content /* <- TODO: !!! Pass here the message object NOT just text */) => {
                    // !!! This will be done in <Chat/>
                    const journalPreviousMessage: BotChatMessage = [...messages]
                        .reverse()
                        .find(({ from }) => from === 'JOURNAL') as BotChatMessage;

                    const myMessage: AliceChatMessage & CompleteChatMessage = {
                        parentMessageId: journalPreviousMessage.messageId,
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
