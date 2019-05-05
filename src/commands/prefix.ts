import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';

export default class PrefixCommand implements Command {
    info = {
        names: ['prefix'],
        description: 'Changes or displays prefix',
        usage: 'prefix { set to }'
    }

    run(message: Message, args: string[], messages: any, options: any): void {
        if(args.length == 0)
            message.reply(`${messages.myPrefix} \`${options.prefix}\``);
        else if(args.length == 1 && message.member.hasPermission('ADMINISTRATOR')) {
            bot.database.collection(message.guild.id).updateOne({
                options: true
            }, {
                $set: {
                    prefix: args[0]
                }
            });
            message.reply(`${messages.setPrefix} \`${args[0]}\``);
        }
    }
}