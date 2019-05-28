import { Message } from 'discord.js';

export default interface Command {
    run: (message: Message, args: string[], messages: any) => any;
    info: {
        names: string[],
        description: string,
        usage: string
    }
}
