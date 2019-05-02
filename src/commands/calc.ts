import Command from '../interfaces/command';
import { Message } from 'discord.js';
import { eval as calc } from 'mathjs';

export default class MathCommand implements Command {
    info = {
        names: ['calc'],
        description: 'Calculates something',
        usage: 'calc (some math)'
    }

    async run(message: Message, args: string[]): Promise<void> {
        message.channel.send(calc(args.join(' ')));
    }
}