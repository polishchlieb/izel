import Command from '../interfaces/command';
import { Message, Collection, GuildMember } from 'discord.js';

export default class BanCommand implements Command {
    info = {
        names: ['ban'],
        description: 'bannin crazy / doesnt workk',
        usage: '&ban'
    }

    run(message: Message, args: string[], messages: any): any {
        if(!message.member.hasPermission('BAN_MEMBERS'))
            return message.reply(messages.noPermission);

        let member: GuildMember = message.mentions.members.first()
            || message.guild.members.find(
                (m: GuildMember): boolean => m.displayName == args.join(' ')
            );

        if(!member)
            return message.reply(messages.couldNotFind);
        if(!member.bannable)
            return message.reply(messages.couldNotBan);

        member.ban().then((member: GuildMember): void => {
            member.user.send(messages.youWereBanned.replace('{}', message.guild.name));
            message.reply(messages.banned.replace('{}', member.user.username));
        });
    }
}
