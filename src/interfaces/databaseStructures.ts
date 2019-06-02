export interface Permission {
    action: string;
    user_ids: string[];
    _id?: string;
}

export interface User {
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
}

export interface Tag {
    server: string;
    title: string;
    content: string;
    _id?: string;
}
