import Command from '../interfaces/command';
import { Message, Collection } from 'discord.js';

export default class BanCommand implements Command {
    info = {
        names: ['ban'],
        description: 'bannin crazy / doesnt workk',
        usage: '&ban'
    }

    async run(message: Message, args: string[], messages: any): Promise<void> {
        
    }
}