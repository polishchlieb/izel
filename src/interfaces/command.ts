import { Client, Message } from 'discord.js';

export interface Command {
    run: (bot: Client, message: Message, args: string[]) => void;

    info: {
        names: string[],
        description: string,
        usage: string
    }
}