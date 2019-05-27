import Command from '../interfaces/command';
import { Message } from 'discord.js';
import { eval as calc } from 'mathjs';

export default class MathCommand implements Command {
    info = {
        names: ['calc'],
        description: 'Calculates something',
        usage: '&calc (..)'
    }

    scope: any = {};

    async run(message: Message, args: string[]): Promise<void> {
        let result: any = calc(args.join(' '), this.scope);
        if(typeof result == 'object')
            message.reply('```' + JSON.stringify(result, null, 2) + '```');
        else message.reply(result);
    }
}
