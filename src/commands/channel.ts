// TODO

import Command from '../interfaces/command';
import { Message } from 'discord.js';

export default class ChannelCommand implements Command {
    info = {
        names: ['channel', 'stat'],
        description: 'Creates member-count channel',
        usage: '&channel (ping)',
        category: 'admin'
    }

    run(message: Message, args: string[], messages: any): void {

    }
}