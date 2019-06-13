import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';
import Messages from '../interfaces/messages';

export default class RankingCommand implements Command {
    info = {
        names: ['ranking'],
        description: 'Switches ranking',
        usage: '&ranking (on / off)',
        category: 'admin'
    };

    async run(message: Message, args: string[], messages: Messages): Promise<any> {
        if(!message.member.hasPermission('ADMINISTRATOR')
            && message.author.id != '372459063339909120')
            return message.reply(messages.noPermission);

        if(!args[0])
            return message.reply(`${messages.use} \`${this.info.usage}\``);

        args[0] = args[0].toLowerCase();
        if(args[0] != 'on' && args[0] != 'off')
            return message.reply(`${messages.use} \`${this.info.usage}\``);

        bot.servers.updateOne({ id: message.guild.id }, { $set: {
            ranking: args[0] == 'on' ? true : false
        }});

        message.reply(messages.updated);
    }
}
