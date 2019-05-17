import Command from '../interfaces/command';
import { Message } from 'discord.js';
import { eval as calc } from 'mathjs';

export default class MathCommand implements Command {
    info = {
        names: ['calc'],
        description: 'Calculates something',
        usage: 'calc (some math)'
    }

    scope: any = {};

    async run(message: Message, args: string[]): Promise<void> {
        message.reply(calc(args.join(' '), this.scope));
    }
}