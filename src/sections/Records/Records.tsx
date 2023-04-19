import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import styles from './Records.module.css';
import { RecordsFilter } from './RecordsFilter/RecordsFilter';

interface RecordsProps {
    variant: 'SHORT' | 'FULL';
}

export function RecordsSection(props: RecordsProps) {
    const { variant } = props;

    const { t } = useTranslation();

    return (
        <Section id="Records" className={styles.RecordsSection}>
            <h2>{t('Records.title')}</h2>
            <Article content={t('Records.content')} isEnhanced />
            <RecordsFilter />
            17.4.2023
            <Link href={`/chat`}>Napsat</Link>
        </Section>
    );
}
