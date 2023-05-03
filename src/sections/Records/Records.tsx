import moment, { Moment } from 'moment';
import 'moment/locale/cs';
import { capitalize } from 'n12';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import { MOCKED_RECORDS } from '../../mocks/records';
import {
    IClassId,
    IPupilId,
    IRecord,
    ISubjectId,
    ISumarizationStyle,
    RecordType,
    string_markdown,
} from '../../model/__IRecord';
import styles from './Records.module.css';
import { RecordsFilter } from './RecordsFilter/RecordsFilter';

interface RecordsProps {}

export function RecordsSection(props: RecordsProps) {
    const { t } = useTranslation();

    const records = MOCKED_RECORDS;

    const subjects = extractSubjects(records);
    const pupils = extractPupils(records);

    const [pupil, setPupil] = useState<IPupilId | null>(null);
    const [sumarizationStyle, setSumarizationStyle] = useState<ISumarizationStyle>('SUMMARIZE');
    const [subject, setSubject] = useState<ISubjectId | null>(null);

    const uniqueDates = extractUniqueDates(records);

    return (
        <Section id="Records" className={styles.RecordsSection}>
            <h2>{t('Records.title')}</h2>
            <Article content={t('Records.content')} isEnhanced />
            <RecordsFilter
                {...{ pupils, subjects, pupil, setPupil, sumarizationStyle, setSumarizationStyle, subject, setSubject }}
            />

            {Array.from(uniqueDates).map((date) => (
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
            ))}
        </Section>
    );
}

function extractSubjects(records: IRecord[]): Set<ISubjectId> {
    const uniqueSubjects = new Set<ISubjectId>();
    records.forEach((record) => {
        if (!record.lessonSubjectId) {
            return;
        }
        uniqueSubjects.add(record.lessonSubjectId);
    });
    return uniqueSubjects;
}

function extractPupils(records: IRecord[]): Set<IPupilId> {
    const uniquePupils = new Set<IPupilId>();
    records.forEach((record) => {
        if (!record.pupilId) {
            return;
        }
        uniquePupils.add(record.pupilId);
    });
    return uniquePupils;
}

function extractUniqueDates(records: IRecord[]): Set<string> {
    const dates: Array<Moment> = [];
    records.forEach((record) => {
        dates.push(moment(record.lessonDate));
    });

    // Note: Sort dates from newest to oldest
    const uniqueDates = new Set(
        dates.sort((date1, date2) => date2.diff(date1)).map((date) => date.format('YYYY/MM/DD')),
    );

    return uniqueDates;
}

type ICalendar = Array<{
    date: Date;
    subjectsAndClasses: Array<{
        // Note: Now there are just listed records for subjectId+classId combination "Matematika 2.A" with whole class + each pupil
        //       Records just for class without subject are not possible yet in ICalendar
        //       Records just for pupil are not possible yet in ICalendar
        classId: IClassId;
        subjectId: ISubjectId;
        pupils: Array<{
            pupilId: IPupilId | null;
            records: Array<{
                type: keyof typeof RecordType;
                content: string_markdown | null;
                contentSummarized?: string_markdown | null;
            }>;
        }>;
    }>;
}>;

function recordsToCalendar(...records: IRecord[]): ICalendar {
    // !!! Implement
}

// TODO: !!! Extract function into files
