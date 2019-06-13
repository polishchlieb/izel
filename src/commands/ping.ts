import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';

export default class PingCommand implements Command {
    info = {
        names: ['ping'],
        description: 'Shows bot ping',
        usage: '&ping',
        category: 'tool'
    };

    run(message: Message): void {
        message.reply(`pong! \`${Math.floor(bot.client.ping)}ms\``);
    }
}