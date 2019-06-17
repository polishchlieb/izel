import { PlayerManager } from 'discord.js-lavalink';

export interface Player {
    manager?: PlayerManager;
    nodes?: { host: string, port: number, password: string}[];
    queue?: { [k: string]: QueueTrack[] };
    playing?: { [k: string]: QueueTrack };
    settings?: { [k: string]: Settings };
}

export interface Settings {
    skipping: string[];
    bass: boolean;
}

export interface Track {
    track: string;
    info: {
        identifier: string;
        isSeekable: boolean;
        author: string;
        length: number;
        isStream: boolean;
        position: number;
        title: string;
        uri: string;
    };
}

export interface QueueTrack {
    track: string;
    title: string;
    thumbnail?: string;
    channel?: string;
    requester?: string;
    started?: number;
    uri: string;
    length: number;
    stream: boolean;
}