import Command from '../interfaces/command';
import { Message } from 'discord.js';

export default class MinecraftCommand implements Command {
    info = {
        names: ['minecraft', 'mc'],
        description: 'meinkampf server info',
        usage: '&minecraft (server ip)'
    }

    run(message: Message, args: string[], messages: any): void {

    }
}