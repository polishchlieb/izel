import { Command } from '../../interfaces/command';
import { Client, Message } from 'discord.js';

export class PingCommand implements Command {
    info = {
        names: ['ping'],
        description: 'ping',
        usage: 'ping'
    }

    async run(bot: Client, message: Message, args: string[]) {
        const m = await message.channel.send('Pong!'),
        now = new Date();
        if(!(m instanceof Message)) return;
        m.edit(`Pong! The ping is ${now.getTime() - m.createdAt.getTime()}ms`);
    }
}