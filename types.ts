
export enum MessageRole {
    USER = 'user',
    MODEL = 'model',
}

export interface MessagePart {
    text: string;
}

export interface Message {
    role: MessageRole;
    parts: MessagePart[];
}
