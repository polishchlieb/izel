import { Command } from '../../interfaces/command';
import { Client, Message } from 'discord.js';

export class KickCommand implements Command {
    info = {
        names: ['kick'],
        description: 'Kicks an user',
        usage: 'kick (ping) [reason..]'
    }

    run(bot: Client, message: Message, args: string[]) {
        if(args.length == 0)
            return message.reply(`use: \`${this.info.usage}\``);
        if(!(message.mentions && message.mentions.members))
            return message.reply(`use: \`${this.info.usage}\``);

        const member = message.mentions.members.first();

        if(member.kickable)
            member.kick(args.slice(1).join(' '))
                .then(() => message.reply(`kicked ${member.user.toString()}`))
                .catch(() => message.reply('couldn\'t kick this user'));
        else message.reply('cannot kick this user');
    }
}