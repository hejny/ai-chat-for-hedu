export type ChatMessage = TeacherChatMessage | JournalChatMessage /* <- TODO: Extract commons */;

export interface TeacherChatMessage {
    // TODO: Internal ID
    date: Date;
    from: 'TEACHER';
    content: string /*_markdown*/;
    isComplete: boolean;
}

export interface JournalChatMessage {
    // TODO: Internal ID
    // TODO: gptMessageId: string;
    date: Date;
    from: 'JOURNAL';
    content: string /*_markdown*/;
    isComplete: boolean;
}

export interface CompleteChatMessage {
    isComplete: true;
}
