import moment from 'moment';
import 'moment/locale/cs';
import { capitalize } from 'n12';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import { MOCKED_RECORDS } from '../../mocks/records';
import { IPupilId, ISubjectId, ISumarizationStyle } from '../../model/__IRecord';
import { extractPupils } from './extractPupils';
import { extractSubjects } from './extractSubjects';
import styles from './Records.module.css';
import { RecordsFilter } from './RecordsFilter/RecordsFilter';
import { recordsToCalendar } from './recordsToCalendar';

interface RecordsProps {}

export function RecordsSection(props: RecordsProps) {
    const { t } = useTranslation();

    const records = MOCKED_RECORDS;

    const subjects = extractSubjects(records);
    const pupils = extractPupils(records);

    const [pupil, setPupil] = useState<IPupilId | null>(null);
    const [sumarizationStyle, setSumarizationStyle] = useState<ISumarizationStyle>('SUMMARIZE');
    const [subject, setSubject] = useState<ISubjectId | null>(null);

    const filteredRecords = records
        .filter((record) => subject === null || record.lessonSubjectId === subject)
        .filter((record) => record.pupilId === pupil);
    const calendar = recordsToCalendar(...filteredRecords);

    return (
        <Section id="Records" className={styles.RecordsSection}>
            <h2>{t('Records.title')}</h2>
            <Article content={t('Records.content')} isEnhanced />
            <RecordsFilter
                {...{ pupils, subjects, pupil, setPupil, sumarizationStyle, setSumarizationStyle, subject, setSubject }}
            />

            {calendar.map(({ date, subjectsAndClasses }) => (
                <div key={date.toISOString()} className={styles.day}>
                    <h2 className={styles.title}>{moment(date).format('D.M.YYYY')}</h2>
                    <i className={styles.subtitle}>
                        {capitalize(moment(date).locale('cs').calendar().split(' v ')[0])}
                    </i>

                    {subjectsAndClasses.map(({ classId, subjectId, pupils }) => (
                        <div className={styles.lesson} key={subjectId + classId}>
                            <h3 className={styles.title}>
                                {subjectId} {classId}
                            </h3>

                            {/* TODO: !!! <div>{sumarizationStyle === 'FULL' ? record.content : record.contentSummarized}</div>*/}

                            {pupils.map(({ pupilId, records }) => {
                                const recordsJsx = (
                                    <ul className={styles.records}>
                                        {records.map(({ type, content, contentSummarized }, i) => (
                                            <li
                                                className={styles.record}
                                                key={i /* <- TODO: Here should be recordId */}
                                            >
                                                {content}
                                                <div className="button">
                                                    {content === null || content.trim() === '' ? 'Napsat' : 'Upravit'}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                );

                                if (!pupilId) {
                                    return (
                                        <div key={'WHOLE_CLASS'} className={styles.wholeClass}>
                                            {recordsJsx}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={'WHOLE_CLASS'} className={styles.wholeClass}>
                                            <h4 className={styles.title}>Záznamy k žákovi {pupilId}:</h4>
                                            {recordsJsx}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    ))}
                </div>
            ))}

            {/* TODO: Remove> Array.from(uniqueDates).map((date) => (
                <div key={date} className={styles.day}>
                    <h2 className={styles.title}>{moment(date).format('D.M.YYYY')}</h2>
                    <i className={styles.subtitle}>
                        {capitalize(moment(date).locale('cs').calendar().split(' v ')[0])}
                    </i>

                    {records
                        .filter((record) => moment(record.lessonDate).isSame(date, 'day'))
                        .filter((record) => subject === null || record.lessonSubjectId === subject)
                        .filter((record) => record.pupilId === pupil)
                        .map((record) => (
                            <div className={styles.lesson} key={record.lessonClassId + record.lessonSubjectId}>
                                <h3 className={styles.title}>
                                    {record.lessonSubjectId} {record.lessonClassId}
                                </h3>
                                <div>{sumarizationStyle === 'FULL' ? record.content : record.contentSummarized}</div>
                                {pupil && (
                                    <div>
                                        Poznámka k žákovi:{' '}
                                        <Link
                                            href={`/chat?date=${date}&subject=${encodeURIComponent(
                                                record.lessonSubjectId!,
                                            )}&class=${encodeURIComponent(
                                                record.lessonClassId!,
                                            )}&pupil=${encodeURIComponent(record.pupilId!)}`}
                                            className="button"
                                        >
                                            Napsat
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            ))*/}
        </Section>
    );
}
