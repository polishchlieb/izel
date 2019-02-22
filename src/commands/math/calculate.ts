import { Command } from '../../interfaces/command';
import { Client, Message } from 'discord.js';
import { eval as calc } from 'mathjs';

export const scope: {[k: string]: any} = {};

export class CalculateCommand implements Command {
    info = {
        names: ['calculate', 'calc'],
        description: 'Calculate given math expression',
        usage: 'calculate (expr..)'
    }

    run(bot: Client, message: Message, args: string[]) {
        let result;

        try {
            result = calc(args.join(' '), scope);
        } catch(e) {
            message.reply(':shrug:');
        } finally {
            message.reply(result);
        }
    }
}