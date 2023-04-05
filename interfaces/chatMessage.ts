export type ChatMessage = AliceChatMessage | BotChatMessage /* <- TODO: Extract commons */;

export interface AliceChatMessage {
    // TODO: Internal ID
    parentMessageId: string /* <- TODO: !!! Probbably link full object and make linear-linked array */;
    date: Date;
    from: 'TEACHER';
    content: string /*_markdown*/;
    isComplete: boolean;
}

export interface BotChatMessage {
    // TODO: Internal ID
    // TODO: Maybe mark messageId as gptMessageId
    messageId: string | 'INITIAL';
    date: Date;
    from: 'JOURNAL';
    content: string /*_markdown*/;
    isComplete: boolean;
}

export interface CompleteChatMessage {
    isComplete: true;
}
