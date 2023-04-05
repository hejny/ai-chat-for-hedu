import { AliceChatMessage, BotChatMessage, CompleteChatMessage } from './chatMessage';

export interface SocketEventMap {
    test(nonce: string): void;
    request(message: AliceChatMessage & CompleteChatMessage): void;

    // TODO: !!! Maybe in different interface
    response: (message: BotChatMessage) => void;
    error: (errorMessage: string) => void;
}
