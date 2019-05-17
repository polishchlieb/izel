import Command from '../interfaces/command';
import { Message } from 'discord.js';

export default class ChooseCommand implements Command {
    info = {
        names: ['choose'],
        description: 'choose cheese',
        usage: '&choose something/something/..'
    }

    run(message: Message, args: string[], messages: any): void {
        let choose = args.join(' ').split('/');
        let random = choose[Math.floor(Math.random() * choose.length)].trim();

        message.reply(`${messages.choose} **${random}** :thinking:`);
    }
}