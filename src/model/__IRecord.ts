export type string_markdown = string;

export type IPupilId = number;
export type ISumarizationStyle = 'FULL' | 'SUMMARIZE';
export type IClassId = string;
export type ISubjectId = string;

export const RecordType = {
    // TODO: !!! Make as array of strings
    LessonGoal: 'LESSON_GOAL',
    LessonEvaluation: 'LESSON_EVALUATION',
    Note: 'NOTE',

    // Kritéria úspěchu
} as const;

export interface IRecord {
    id: string;
    lessonDate: Date;
    lessonClassId: IClassId;
    lessonSubjectId: ISubjectId | null;
    pupilId: IPupilId | null;
    type: keyof typeof RecordType;

    content: string_markdown | null;

    /**
     * Summarized content
     *
     * - null means that content is yet written
     * - undefined means that content is not yet summarized
     */
    contentSummarized?: string_markdown | null;
}

export type IRecordData = Omit<IRecord, 'lessonDate'> & { lessonDate: string };

export function serializeRecord(record: IRecord): IRecordData {
    return {
        ...record,
        lessonDate: record.lessonDate.toISOString(),
    };
}

export function deserializeRecord(record: IRecordData): IRecord {
    return {
        ...record,
        lessonDate: new Date(record.lessonDate),
    };
}

export function getPupilName(pupilId: IPupilId): string {
    return [
        `Franta Opička`,
        `Jana Havlíčková`,
        `Marie Němcová`,
        `Jiří Kratochvíl`,
        `Kateřina Kšírová`,
        `Josef Urban`,
        `Josef Červenka`,
    ][pupilId];
}

export function getTypeName(type: keyof typeof RecordType): string {
    return {
        LessonGoal: 'cíl hodiny',
        LessonEvaluation: 'hodnocení hodiny',
        Note: 'poznámku',
    }[type];
}

/**
 * TODO: !!! Use Branded types
 * TODO: !!! Break into files
 */
