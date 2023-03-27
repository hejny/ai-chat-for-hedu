import { useRef } from 'react';
import { Promisable } from 'type-fest';
import { classNames } from '../../utils/classNames';
import { Article } from '../Article/Article';
import styles from './Chat.module.css';
export interface ChatMessage {
    // TODO: ID
    date: Date;
    from: 'TEACHER' | 'JOURNAL';
    content: string /*_markdown*/;
}

interface ChatProps {
    messages: Array<ChatMessage>;
    onMessage(messageContent: string): Promisable<void>;
}

export function Chat(props: ChatProps) {
    const { messages, onMessage } = props;

    const textAreaElement = useRef<HTMLTextAreaElement>();

    const handleSend = async () => {
        if (!textAreaElement.current) {
            throw new Error(`Can not find textarea`);
        }

        await onMessage(textAreaElement.current.value);

        textAreaElement.current.value = '';
        textAreaElement.current.focus();
    };

    return (
        <div className={styles.Chat}>
            <div className={styles.chatMessages}>
                {messages.map(({ from, content }, i) => (
                    <div key={i} className={classNames(styles.chatMessage, from === 'TEACHER' && styles.sender)}>
                        <div key={i} className={styles.sender}>
                            {from.substring(0, 1)}
                        </div>
                        <div key={i} className={styles.messageText}>
                            <Article /* TODO: className={styles.messageText} */ {...{ content }} />
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.chatInput}>
                <textarea
                    ref={textAreaElement as any} /* <- !!! Focus on page load */
                    defaultValue=""
                    placeholder="Napište zprávu"
                    onKeyDown={(event) => {
                        if (event.shiftKey) {
                            return;
                        }
                        if (event.key !== 'Enter') {
                            return;
                        }

                        event.preventDefault();
                        /* not await */ handleSend();
                    }}
                />
                <button onClick={/* not await */ handleSend}>Odeslat</button>
            </div>
        </div>
    );
}
