import Image from 'next/image';
import { useEffect, useRef } from 'react';
import spaceTrim from 'spacetrim';
import { Promisable } from 'type-fest';
import journalAvatar from '../../../public/people/journal.jpeg';
import teacherAvatar from '../../../public/people/teacher.jpeg';
import { classNames } from '../../utils/classNames';
import { Article } from '../Article/Article';
import { VoiceRecognitionButton } from '../VoiceRecognitionButton/VoiceRecognitionButton';
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

    const textareaRef = useRef<HTMLTextAreaElement>();

    useEffect(
        (/* Focus textarea on page load */) => {
            if (!textareaRef.current) {
                return;
            }
            textareaRef.current.focus();
        },
        [textareaRef],
    );

    const handleSend = async () => {
        const textareaElement = textareaRef.current;

        if (!textareaElement) {
            throw new Error(`Can not find textarea`);
        }

        if (spaceTrim(textareaElement.value) === '') {
            return;
        }

        await onMessage(textareaElement.value);

        textareaElement.value = '';
        textareaElement.focus();
    };

    return (
        <div className={styles.Chat}>
            <div className={styles.chatMessages}>
                {messages.map(({ from, content }, i) => (
                    <div key={i} className={classNames(styles.chatMessage, from === 'TEACHER' && styles.sender)}>
                        <div key={i} className={styles.avatar}>
                            <Image
                                src={{ JOURNAL: journalAvatar, TEACHER: teacherAvatar }[from]}
                                alt={`AI generated image of ${from.toLocaleLowerCase()} as small cartoon avatar`}
                            />
                        </div>

                        <div key={i} className={styles.messageText}>
                            <Article /* TODO: className={styles.messageText} */ {...{ content }} />
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.chatInput}>
                <textarea
                    ref={textareaRef as any}
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

                <VoiceRecognitionButton language="cs" {...{ textareaRef }} />
            </div>
        </div>
    );
}
