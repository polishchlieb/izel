import { Command } from '../interfaces/command';
import { Client, Message } from 'discord.js';

export class HelloCommand implements Command {
    info = {
        names: ['hello'],
        description: '',
        usage: 'hello'
    }

    run(bot: Client, message: Message, args: string[]) {
        message.reply('Hello, `' + args.join(' ') + '`');
    }
}