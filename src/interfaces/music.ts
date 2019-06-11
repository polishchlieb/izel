import { StreamDispatcher } from 'discord.js';

export interface QueueElement {
    link: string,
    thumbnail: string,
    title: string,
    channel?: string,
    requester?: string
}

export interface MusicServer {
    dispatcher?: StreamDispatcher;
    queue: QueueElement[];
    playing?: QueueElement
}