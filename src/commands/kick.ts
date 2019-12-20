import Command from '../interfaces/command';
import { Message, GuildMember } from 'discord.js';
import Messages from '../interfaces/messages';

export default class KickCommand implements Command {
    info = {
        names: ['kick'],
        description: 'Kicks someone',
        usage: '&kick (ping | userID) { reason }',
        category: 'admin'
    };

    run(message: Message, args: string[], messages: Messages): any {
        if(!message.member.hasPermission('KICK_MEMBERS'))
            return message.reply(messages.noPermission);
        if(!args.length)
            return message.reply(`${messages.use} \`${this.info.usage}\``);
        if(!message.mentions.members.first() && !message.guild.member(args[0]))
            return message.reply(`${messages.use} \`${this.info.usage}\``);

        let member: GuildMember = message.mentions.members.first() || message.guild.member(args[0]);
        if(!member)
            return message.reply(messages.couldNotFind);
        if(!member.kickable)
            return message.reply(messages.couldNotKick);

        member.kick().then((member: GuildMember): void => {
            member.user.send(
                messages.youWereKicked.replace('{}', message.guild.name)
                + (args.length > 0) ? ': ' + args.join(' ') : ''
            );

            message.reply(messages.kicked.replace('{}', member.user.username));
        });
    }
}
