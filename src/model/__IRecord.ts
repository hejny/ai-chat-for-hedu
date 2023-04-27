import moment from 'moment';

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

export const MOCKED_RECORDS: Array<IRecord> = [
    {
        lessonDate: moment('2023/04/21').toDate(),
        lessonClassId: '2.A',
        lessonSubjectId: 'HISTORY',
        pupilId: null,
        content:
            'During this history lesson, we will explore the ancient Egyptian civilization and its impact on the world. We will look at their social, economic, and political structures and understand how they contributed to the development of human civilization. Students will also learn about the pharaohs, the Nile River, and the Egyptian hieroglyphs. We will discuss the importance of preserving ancient artifacts and learn about the challenges faced by archaeologists in uncovering the mysteries of ancient civilizations.',
        contentSummarized:
            'This history lesson will explore the ancient Egyptian civilization and its impact on the world. We will look at their social, economic, and political structures and understand how they contributed to the development of human civilization.',
    },
    {
        lessonDate: moment('2023/04/22').toDate(),
        lessonClassId: '3.B',
        lessonSubjectId: 'SCIENCE',
        pupilId: null,
        content:
            'In this science lesson, we will learn about the different states of matter and their properties. We will explore the characteristics of solids, liquids, and gases and understand how they behave differently under different conditions. Students will also learn about the concept of energy and its role in the behavior of matter. We will conduct experiments to observe changes in matter and discuss the real-world applications of our understanding of matter and energy.',
        contentSummarized:
            'This science lesson will focus on the different states of matter and their properties. We will explore the characteristics of solids, liquids, and gases and conduct experiments to observe changes in matter.',
    },
    {
        lessonDate: moment('2023/04/23').toDate(),
        lessonClassId: '4.C',
        lessonSubjectId: 'ENGLISH',
        pupilId: null,
        content:
            'During this English lesson, we will focus on developing the students’ reading comprehension skills. We will read and analyze a short story, focusing on the plot, character development, and theme. We will also discuss literary devices such as foreshadowing, symbolism, and imagery. Students will practice critical thinking skills by making connections between the story and their own experiences, and by analyzing the story from different perspectives.',
        contentSummarized:
            'This English lesson will focus on developing students’ reading comprehension skills through analyzing a short story and discussing literary devices.',
    },
    {
        lessonDate: moment('2023/04/24').toDate(),
        lessonClassId: '5.D',
        lessonSubjectId: 'PHYSICAL EDUCATION',
        pupilId: null,
        content:
            'During this physical education class, we will focus on improving the students’ coordination and balance. We will practice a variety of exercises that target different muscle groups and improve overall fitness. We will also discuss the importance of warm-up and cool-down routines, as well as the benefits of regular physical activity for overall health and well-being. Students will work individually and in pairs to practice the exercises and receive feedback from their peers and the teacher.',
        contentSummarized:
            'This physical education class will focus on improving students’ coordination and balance through a variety of exercises that target different muscle groups.',
    },
];

/**
 * TODO: !!! Use Branded types
 * TODO: !!! Break into files
 */
