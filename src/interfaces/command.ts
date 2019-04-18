import { Message } from 'discord.js';

export interface Command {
    // any to do things like return message.reply(...);
    run: (message: Message, args: string[]) => any;

    info: {
        names: string[],
        description: string,
        usage: string
    }
}