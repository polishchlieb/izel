export interface Permission {
    action: string;
    user_ids: string[];
    _id?: string;
}

export interface StatUser {
    id: string;
    level: number;
    messages: number;
    guild: string;
    cooldown: number;
    _id?: string;
}

export interface Server {
    id: string;
    language: string;
    ranking: boolean;
    prefix: string;
    _id?: string;
    autorole?: string;
    greeting?: {
        channel: string,
        content: string;
    };
    goodbye?: {
        channel: string,
        content: string
    };
}

export interface Tag {
    server: string;
    title: string;
    content: string;
    _id?: string;
}

export interface User {
    _id?: string;
}

export interface Channel {
    id: string;
    name: string;
    guild: string;
    _id?: string;
    // TODO (more than just member count)
    // subs: string[];
}

export interface ClickRole {
    guild: string;
    message: string;
    reactions: {
        [emojiname: string]: string // role id
    };
    _id?: string;
}