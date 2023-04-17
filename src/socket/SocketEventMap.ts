import { CompleteChatMessage, JournalChatMessage, TeacherChatMessage } from '../model/chatMessage';

export interface SocketEventMap {
    test(nonce: string): void;
    chatRequest(message: TeacherChatMessage & CompleteChatMessage): void;

    // TODO: Following maybe in different interface
    chatResponse: (message: JournalChatMessage) => void;
    error: (errorMessage: string) => void;
}

/**
 * TODO: !!!!!!!!!! In socket types CAN NOT be Dates
 */
