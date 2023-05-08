import { IRecord } from '../../model/__IRecord';
import { ICalendar } from './ICalendar';

export function recordsToCalendar(...records: IRecord[]): ICalendar {
    // Initialize an empty calendar
    const calendar: ICalendar = [];

    // Loop through each record
    records.forEach((record) => {
        // Find the date of the record in the calendar
        let dateEntry = calendar.find((entry) => entry.date.getTime() === record.lessonDate.getTime());

        // If the date does not exist in the calendar, add it
        if (!dateEntry) {
            dateEntry = {
                date: record.lessonDate,
                subjectsAndClasses: [],
            };
            calendar.push(dateEntry);
        }

        // Find the subject and class of the record in the date entry
        let subjectAndClass = dateEntry.subjectsAndClasses.find(
            (entry) => entry.classId === record.lessonClassId && entry.subjectId === record.lessonSubjectId,
        );

        // If the subject and class do not exist in the date entry, add them
        if (!subjectAndClass) {
            subjectAndClass = {
                classId: record.lessonClassId,
                subjectId: record.lessonSubjectId!,
                pupils: [],
            };
            dateEntry.subjectsAndClasses.push(subjectAndClass);
        }

        // Find the pupil of the record in the subject and class entry
        let pupil = subjectAndClass.pupils.find((entry) => entry.pupilId === record.pupilId);

        // If the pupil does not exist in the subject and class entry, add them
        if (!pupil) {
            pupil = {
                pupilId: record.pupilId,
                records: [],
            };
            subjectAndClass.pupils.push(pupil);
        }

        // Add the record to the pupil's records array
        pupil.records.push({
            id: record.id,
            type: record.type,
            content: record.content,
            contentSummarized: record.contentSummarized,
        });
    });

    // Return the calendar
    return calendar;
}
