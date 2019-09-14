import Command from '../interfaces/command';
import { Message } from 'discord.js';

export default class OkoCommand implements Command {
    info = {
        names: ['oko', 'nub'],
        description: 'oko nub',
        category: 'games',
        usage: '&oko nub'
    };

    run(message: Message, []: string[]): void {
        message.channel.send('oko nub');
    }
}