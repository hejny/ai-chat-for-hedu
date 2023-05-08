import moment from 'moment';
import 'moment/locale/cs';
import { capitalize } from 'n12';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import { getPupilName, getTypeName, IPupilId, ISubjectId, ISumarizationStyle } from '../../model/__IRecord';
import { useFetchRecords } from '../../utils/hooks/useFetchRecords';
import { extractPupils } from './extractPupils';
import { extractSubjects } from './extractSubjects';
import styles from './Records.module.css';
import { RecordsFilter } from './RecordsFilter/RecordsFilter';
import { recordsToCalendar } from './recordsToCalendar';

interface RecordsProps {}

export function RecordsSection(props: RecordsProps) {
    const { t } = useTranslation();

    const records = useFetchRecords();

    const subjects = extractSubjects(records);
    const pupils = extractPupils(records);

    const [pupil, setPupil] = useState<IPupilId | null | undefined>(null);
    const [sumarizationStyle, setSumarizationStyle] = useState<ISumarizationStyle>('SUMMARIZE');
    const [subject, setSubject] = useState<ISubjectId | undefined>(undefined);

    const filteredRecords = records
        .filter((record) => subject === undefined || record.lessonSubjectId === subject)
        .filter((record) => pupil === undefined || record.pupilId === pupil);
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
                                {t(`subjects.${subjectId}`)} {classId}
                            </h3>

                            {/* TODO: !!! <div>{sumarizationStyle === 'FULL' ? record.content : record.contentSummarized}</div>*/}

                            {pupils.map(({ pupilId, records }) => {
                                const recordsJsx = (
                                    <ul className={styles.records}>
                                        {records.map(({ id, type, content, contentSummarized }, i) => (
                                            <li className={styles.record} key={id}>
                                                {content}
                                                <div className="button">
                                                    {content === null || content.trim() === '' ? 'Napsat' : 'Upravit'}{' '}
                                                    {getTypeName(type)}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                );

                                if (pupilId === null) {
                                    return (
                                        <div key={'WHOLE_CLASS'} className={styles.wholeClass}>
                                            <h4 className={styles.title}>👥 Celá třída:</h4>
                                            {recordsJsx}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={'WHOLE_CLASS'} className={styles.wholeClass}>
                                            <h4 className={styles.title}>👤 {getPupilName(pupilId)}:</h4>
                                            {recordsJsx}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    ))}
                </div>
            ))}
        </Section>
    );
}
