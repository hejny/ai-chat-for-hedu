import { MutableRefObject, useState } from 'react';

interface VoiceRecognitionButtonProps {
    textareaRef: MutableRefObject<HTMLTextAreaElement | undefined>;
}

export function VoiceRecognitionButton(props: VoiceRecognitionButtonProps) {
    const { textareaRef } = props;
    const [isRecording, setIsRecording] = useState(false);

    const handleStartRecording = () => {
        setIsRecording(true);

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0].transcript)
                .join('');

            textareaRef.current.value += transcript;
        };

        recognition.start();
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        (window as any).webkitSpeechRecognition.stop();
    };

    return (
        <button onClick={isRecording ? handleStopRecording : handleStartRecording}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
    );
}

/**
 * TODO: !!! For all browsers
 * TODO: !!! Enforce cs
 */
