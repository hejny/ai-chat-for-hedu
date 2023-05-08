import { useTranslation } from 'next-i18next';
import { useRef, useState } from 'react';
import { getTypeName, IRecord } from '../../model/__IRecord';

interface RecordProps {
    record: Pick<IRecord, 'id' | 'type' | 'content' | 'contentSummarized'>;
}

export function Record(props: RecordProps) {
    const { t } = useTranslation();
    const textareaElement = useRef<HTMLTextAreaElement>();
    const { record } = props;
    const { content, type } = record;

    const [isEditing, setIsEditing] = useState(false);

    if (!isEditing) {
        return (
            <>
                {content}
                <div className="button" onClick={() => setIsEditing(true)}>
                    {content === null || content.trim() === '' ? 'Napsat' : 'Upravit'} {getTypeName(type)}
                </div>
            </>
        );
    } else {
        return (
            <>
                <textarea defaultValue={content || ''} ref={textareaElement as any} />
                <div
                    className="button"
                    onClick={async () => {
                        const response = await fetch('/api/records', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                record: {
                                    id: record.id,
                                    type: record.type,
                                    content: textareaElement.current?.value || '',
                                },
                            }),
                        });

                        const json = (await response.json()) as { message: string };

                        // alert(json.message);

                        // TODO: [0] setIsEditing(false);
                        window.location.reload(/* TODO: [0] This will be done better in real version */);
                    }}
                >
                    Uložit
                </div>
                <div
                    className="button"
                    onClick={() => {
                        if (!confirm('Opravdu chcete zrušit úpravu?')) {
                            return;
                        }

                        setIsEditing(false);
                    }}
                >
                    Zrušit
                </div>
            </>
        );
    }
}
