import { Command } from '../interfaces/command';
import { Client, Message } from 'discord.js';

export class TestCommand implements Command {
    info = {
        names: ['test', 't'],
        description: 'Test',
        usage: 'test'
    }

    run(bot: Client, message: Message, args: string[]) {
        message.reply('hello');
    }
}