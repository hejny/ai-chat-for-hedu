import Image from 'next/image';
import { useEffect, useRef } from 'react';
import spaceTrim from 'spacetrim';
import { Promisable } from 'type-fest';
import { ChatMessage } from '../../../interfaces/chatMessage';
import journalAvatar from '../../../public/people/journal.jpeg';
import teacherAvatar from '../../../public/people/teacher.jpeg';
import { classNames } from '../../utils/classNames';
import { Article } from '../Article/Article';
import { VoiceRecognitionButton } from '../VoiceRecognitionButton/VoiceRecognitionButton';
import styles from './Chat.module.css';

interface ChatProps {
    messages: Array<ChatMessage>;
    onMessage(messageContent: string /* <- TODO: !!! Pass here the message object NOT just text */): Promisable<void>;
}

export function Chat(props: ChatProps) {
    const { messages, onMessage } = props;

    const textareaRef = useRef<HTMLTextAreaElement>();
    const buttonSendRef = useRef<HTMLButtonElement>();

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
        const buttonSendElement = buttonSendRef.current;

        if (!textareaElement) {
            throw new Error(`Can not find textarea`);
        }
        if (!buttonSendElement) {
            throw new Error(`Can not find textarea`);
        }

        textareaElement.disabled = true;
        buttonSendElement.disabled = true;

        try {
            if (spaceTrim(textareaElement.value) === '') {
                throw new Error(`You need to write some text`);
            }

            await onMessage(textareaElement.value);

            textareaElement.value = '';
            textareaElement.focus();
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }

            console.error(error);
            alert(error.message);
        } finally {
            textareaElement.disabled = false;
            buttonSendElement.disabled = false;
        }
    };

    return (
        <div className={styles.Chat}>
            <div className={styles.chatMessages}>
                {messages.map((message, i) => (
                    <div
                        key={i}
                        className={classNames(styles.chatMessage, message.from === 'TEACHER' && styles.sender)}
                    >
                        <div className={styles.avatar}>
                            <Image
                                src={{ JOURNAL: journalAvatar, TEACHER: teacherAvatar }[message.from]}
                                alt={`AI generated image of ${message.from.toLocaleLowerCase()} as small cartoon avatar`}
                            />
                        </div>

                        <div className={styles.messageText}>
                            <pre>{JSON.stringify(message, null, 4)}</pre>
                            <Article
                                /* TODO: className={styles.messageText} */ {...{ content: message.content }}
                                isSpoken
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.chatInput}>
                <textarea
                    ref={textareaRef as any}
                    // defaultValue={INITIAL_TEACHER_MESSAGE_TEXT /* <- !!! Do not use this just as a placeholder */}
                    // TODO: placeholder={INITIAL_TEACHER_MESSAGE_TEXT}
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
                <button ref={buttonSendRef as any} onClick={/* not await */ handleSend}>
                    Odeslat
                </button>

                <VoiceRecognitionButton language="cs" {...{ textareaRef }} />
            </div>
        </div>
    );
}
