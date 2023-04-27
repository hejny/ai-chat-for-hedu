
export type string_markdown = string;

export type IPupilId = number;
export type ISumarizationStyle = 'FULL' | 'SUMMARIZE';
export type IClassId = string;
export type ISubjectId = string;

export interface IRecord {
    lessonDate: Date;
    lessonClassId: IClassId;
    lessonSubjectId: ISubjectId | null;
    pupilId: IPupilId | null;

    content: string_markdown;
    contentSummarized: string_markdown;
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
