import { IClassId, IPupilId, ISubjectId, RecordType, string_markdown } from '../../model/__IRecord';

export type ICalendar = Array<{
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
