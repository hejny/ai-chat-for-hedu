import { IRecord, ISubjectId } from '../../model/__IRecord';

export function extractSubjects(records: IRecord[]): Set<ISubjectId> {
    const uniqueSubjects = new Set<ISubjectId>();
    records.forEach((record) => {
        if (!record.lessonSubjectId) {
            return;
        }
        uniqueSubjects.add(record.lessonSubjectId);
    });
    return uniqueSubjects;
}
