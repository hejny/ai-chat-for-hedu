import { MutableRefObject, useState } from 'react';

interface VoiceRecognitionButtonProps {
    /**
     * A reference to the textarea where the transcript should be written.
     */
    textareaRef: MutableRefObject<HTMLTextAreaElement | undefined> /* <- TODO: RefObject<HTMLTextAreaElement> */;

    /**
     * The language code to use for voice recognition (e.g. "en-US").
     */
    language: string;
}

/**
 * A button component that starts voice recognition and writes to a given textarea.
 */
export function VoiceRecognitionButton(props: VoiceRecognitionButtonProps) {
    const { textareaRef, language } = props;
    const [isRecording, setRecording] = useState(false);

    return (
        <button
            onClick={() => {
                const speechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

                if (isRecording) {
                    speechRecognition.stop();
                    setRecording(false);
                } else {
                    const recognitionInstance = new speechRecognition();
                    recognitionInstance.lang = language;
                    recognitionInstance.continuous = true;
                    recognitionInstance.interimResults = true;

                    recognitionInstance.onresult = (event: any /*SpeechRecognitionResult*/): void => {
                        const transcript = Array.from(event.results)
                            .map((result: any) => result[0].transcript)
                            .join('');

                        // TODO: !!!!! Append NOT override
                        textareaRef.current!.value = transcript;
                    };

                    recognitionInstance.start();
                    setRecording(true);
                }
            }}
        >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
    );
}

/**
 * TODO: !!! Reset recording after send
 * TODO: !!! Conversation mode - auto switch between dictation and speech
 * TODO: !!! Auto sent - with "odeslat" OR longer pause
 * TODO: !!! For all browsers
 * TODO: !!! Enforce cs
 */
