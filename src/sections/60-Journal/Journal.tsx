import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { INITIAL_JOURNAL_MESSAGE_TEXT } from '../../../config';
import { AliceChatMessage, BotChatMessage, ChatMessage, CompleteChatMessage } from '../../../interfaces/chatMessage';
import { Article } from '../../components/Article/Article';
import { Chat } from '../../components/Chat/Chat';
import { Playground, socket } from '../../components/Playground/Playground';
import { Section } from '../../components/Section/Section';
import styles from './Journal.module.css';

export function JournalSection() {
    const { t } = useTranslation();

    // TODO: Make custom hook - event sourced
    const [messages, setMessages] = useState<Array<ChatMessage>>([
        {
            messageId: 'INITIAL',
            date: new Date(),
            from: 'JOURNAL',
            content: INITIAL_JOURNAL_MESSAGE_TEXT,
            isComplete: true,
        },
    ]);

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

                    socket.emit('request', myMessage);
                    socket.on('response', (replyMessage) => {
                        setMessages([...messages, myMessage, replyMessage]);

                        // TODO: !!! Translate to RxJS object
                        // TODO: !!! Speech here
                        // TODO: !!! Cancel this listener
                    });

                    /*
                    /* not await BUT maybe should be * / speak(
                        removeMarkdownFormatting(replyMessage.content),
                        'cs',
                    ) /* <- TODO: !!! Do speech here or inside <Chat/> component * /;
                    */
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
