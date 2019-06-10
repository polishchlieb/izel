import Command from '../interfaces/command';
import { Message } from 'discord.js';

export default class ChooseCommand implements Command {
    info = {
        names: ['choose'],
        description: 'choose cheese',
        usage: '&choose something/something/..',
        category: 'tool'
    }

    run(message: Message, args: string[], messages: any): any {
        let choose: string[] = args.join(' ').split('/');
        if(choose.length == 0)
            return message.reply(`${messages.use} \`${this.info.usage}\``);
        let random: string = choose[Math.floor(Math.random() * choose.length)].trim();

        message.reply(`${messages.choose} **${random}** :thinking:`);
    }
}