import { Command } from '../../interfaces/command';
import { Client, Message } from 'discord.js';

export class BanCommand implements Command {
    info = {
        names: ['ban'],
        description: 'Bans an user',
        usage: 'ban (ping) [reason..]'
    }

    run(bot: Client, message: Message, args: string[]) {
        if(args.length == 0)
            return message.reply(`use: \`${this.info.usage}\``);
        if(!(message.mentions && message.mentions.members))
            return message.reply(`use: \`${this.info.usage}\``);

        const member = message.mentions.members.first();

        if(member.bannable)
            member.ban(args.slice(1).join(' '))
                .then(() => message.reply(`banned ${member.user.toString()}`))
                .catch(() => message.reply('couldn\'t ban this user'));
        else message.reply('cannot ban this user');
    }
}