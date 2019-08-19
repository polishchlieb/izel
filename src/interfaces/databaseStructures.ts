export interface Permission {
    action: string;
    user_ids: string[];
    _id?: string;
}

export interface StatUser {
    id: string;
    level: number;
    points: number;
    messages?: number;
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
    selfCategories?: string[]
    selfroles?: Selfrole[]
}

export interface Selfrole {
    pos: number; // selfrole position
    id: string; // selfrole id
    name: string; // selfrole name
    category: string; // selfrole category
    color: string; // hex string ex. #abcdef
    user: boolean; // if user has this role
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
    message: string;
    roles: { [k: string]: string };
}