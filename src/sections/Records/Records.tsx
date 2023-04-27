import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import { IPupilId, ISubjectId, ISumarizationStyle, MOCKED_RECORDS } from '../../model/__IRecord';
import styles from './Records.module.css';
import { RecordsFilter } from './RecordsFilter/RecordsFilter';

interface RecordsProps {
    //variant: 'SHORT' | 'FULL';
}

export function RecordsSection(props: RecordsProps) {
    //const { variant } = props;

    const { t } = useTranslation();

    const records = MOCKED_RECORDS;

    const [pupil, setPupil] = useState<IPupilId | null>(null);
    const [sumarizationStyle, setSumarizationStyle] = useState<ISumarizationStyle>('SUMMARIZE');
    const [subject, setSubject] = useState<ISubjectId | null>(null);

    return (
        <Section id="Records" className={styles.RecordsSection}>
            <h2>{t('Records.title')}</h2>
            <Article content={t('Records.content')} isEnhanced />
            <RecordsFilter
                {...{ pupil: pupil, setPupil, sumarizationStyle, setSumarizationStyle, subject, setSubject }}
            />

            {['17.4.2023', '18.4.2023', '19.4.2023', '20.4.2023'].map((dateTitle) => (
                <div key={dateTitle} className={styles.day}>
                    <h2 className={styles.title}>{dateTitle}</h2>

                    <div className={styles.lesson}>
                        <h3 className={styles.title}>Prvouka 1.B</h3>
                        <div>Cíle: Obratlovci</div>
                        {pupil && (
                            <div>
                                Poznámka k žákovi:{' '}
                                <Link href={`/chat`} className="button">
                                    Napsat
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className={styles.lesson}>
                        <h3 className={styles.title}>Matematika 2.A</h3>
                        <div>Cíle: Pythagorova věta</div>
                        <div>
                            Poznámka k žákovi:{' '}
                            <Link
                                href={`/chat?date=${encodeURIComponent(dateTitle)}&subject=MATH&class=2.A&pupil=24`}
                                className="button"
                            >
                                Napsat
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </Section>
    );
}
