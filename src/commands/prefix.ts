import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';
import { Server } from '../interfaces/databaseStructures';
import Messages from '../interfaces/messages';

export default class PrefixCommand implements Command {
    info = {
        names: ['prefix'],
        description: 'Shows/sets the prefix (replace trailing space with /_)',
        usage: '&prefix { new prefix.. }',
        category: 'admin'
    };

    async run(message: Message, args: string[], messages: Messages): Promise<any> {
        if(!message.member.hasPermission('MANAGE_CHANNELS'))
            return message.reply(messages.noPermission);

        if(args.length == 0) {
            let guild: Server = await bot.servers.findOne({
                id: message.guild.id
            });

            message.channel.send(`${messages.myPrefix} \`${guild.prefix}\``);
        } else {
            bot.servers.updateOne({
                id: message.guild.id
            }, { $set:
                { prefix: args.join(' ').replace('/_', ' ') }
            });

            message.reply(`${messages.setPrefix} \`${args.join(' ').replace('/_', ' ')}\``);
        }
    }
}