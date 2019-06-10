import Command from '../interfaces/command';
import { Message, GuildMember } from 'discord.js';

export default class BanCommand implements Command {
    info = {
        names: ['ban'],
        description: 'bannin crazy',
        usage: '&ban (ping | name..)',
        category: 'admin'
    }

    run(message: Message, args: string[], messages: any): any {
        if(!message.member.hasPermission('BAN_MEMBERS'))
            return message.reply(messages.noPermission);
        if(args.length == 0)
            return message.reply(`${messages.use} \`${this.info.usage}\``);
        if(!args[0].match(/<@[0-9]{18}>/))
            return message.reply(`${messages.use} \`${this.info.usage}\``);

        let member: GuildMember = message.guild.member(args.shift().substring(2, 20));
        if(!member)
            return message.reply(messages.couldNotFind);
        if(!member.bannable)
            return message.reply(messages.couldNotBan);

        member.ban().then((member: GuildMember): void => {
            member.user.send(
                messages.youWereBanned.replace('{}', message.guild.name)
                + args.length > 0 ? ': ' + args.join(' ') : ''
            );

            message.reply(messages.banned.replace('{}', member.user.username));
        });
    }
}
