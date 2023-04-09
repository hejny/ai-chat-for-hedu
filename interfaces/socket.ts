import { AliceChatMessage, BotChatMessage, CompleteChatMessage } from './chatMessage';

export interface SocketEventMap {
    test(nonce: string): void;
    chatRequest(message: AliceChatMessage & CompleteChatMessage): void;

    // TODO: Following maybe in different interface
    chatResponse: (message: BotChatMessage) => void;
    error: (errorMessage: string) => void;
}
