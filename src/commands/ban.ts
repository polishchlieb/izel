import Command from '../interfaces/command';
import { Message, Collection } from 'discord.js';

// TODO

export default class BanCommand implements Command {
    info = {
        names: ['ban'],
        description: 'bannin crazy',
        usage: 'ban'
    }

    async run(message: Message, args: string[], messages: any): Promise<void> {
        // let collector: Collection<string, Message> = await message.channel.awaitMessages((message: Message): boolean => {
        //     return true;
        // }, { max: 1, time: 60000 });
    }
}