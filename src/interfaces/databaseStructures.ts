export interface Permission {
    action: string;
    user_ids: string[];
}

export interface User {
    id: string;
    level: number;
    messages: number;
    guild: string;
}

export interface Server {
    id: string;
    language: string;
    ranking?: boolean;
}

export interface Tag {
    server: string;
    title: string;
    content: string;
}
