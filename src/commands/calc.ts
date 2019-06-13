import Command from '../interfaces/command';
import { Message } from 'discord.js';
import { eval as calc } from 'mathjs';

export default class MathCommand implements Command {
    info = {
        names: ['calc'],
        description: 'Calculates something',
        usage: '&calc (..)',
        category: 'tool'
    };

    scope: any = {};

    async run(message: Message, args: string[]): Promise<void> {
        let result: any = calc(args.join(' '), this.scope);

        if(typeof result == 'object') {
            result = JSON.parse(JSON.stringify(result));
            message.channel.send(`**${result.mathjs}**\n${Object.keys(result).slice(1).map((key: string): string => `${key}: ${result[key]}`).join('\n')}`);
        }
        else message.channel.send(result);
    }
}
