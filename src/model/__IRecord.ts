export type string_markdown = string;

export type IPupilId = number;
export type ISumarizationStyle = 'FULL' | 'SUMMARIZE';
export type IClassId = string;
export type ISubjectId = string;

const RecordType = {
    // !!! Or just as array of strings
    LessonGoal: 'LESSON_GOAL',
    LessonEvaluation: 'LESSON_EVALUATION',
    Note: 'NOTE',
} as const;

export interface IRecord {
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

/**
 * TODO: !!! Use Branded types
 * TODO: !!! Break into files
 */
