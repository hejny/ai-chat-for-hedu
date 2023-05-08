import { useTranslation } from 'next-i18next';
import { getTypeName, IRecord } from '../../model/__IRecord';

interface RecordProps {
    record: Pick<IRecord, 'id' | 'type' | 'content' | 'contentSummarized'>;
}

export function Record(props: RecordProps) {
    const { t } = useTranslation();
    const { record } = props;
    const { content, type } = record;

    return (
        <>
            {content}
            <div className="button">
                {content === null || content.trim() === '' ? 'Napsat' : 'Upravit'} {getTypeName(type)}
            </div>
        </>
    );
}
