import Command from '../interfaces/command';
import { Message } from 'discord.js';

export default class TagCommand implements Command {
    info = {
        names: ['tag'],
        description: 'taggo',
        usage: 'tag ( title ) { description.. }'
    }

    run(message: Message, args: string[], messages: any): void {
        
    }
}