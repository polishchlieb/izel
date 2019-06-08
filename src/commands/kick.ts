import Command from '../interfaces/command';
import { Message, GuildMember } from 'discord.js';

export default class KickCommand implements Command {
    info = {
        names: ['kick'],
        description: 'Kicks someone',
        usage: '&kick (ping) { reason }'
    }

    run(message: Message, args: string[], messages: any): any {
        if(!message.member.hasPermission('KICK_MEMBERS'))
            return message.reply(messages.noPermission);
        if(args.length == 0)
            return message.reply(`${messages.use} \`${this.info.usage}\``);
        if(!args[0].match(/<@[0-9]{18}>/))
            return message.reply(`${messages.use} \`${this.info.usage}\``);

        let member: GuildMember = message.guild.member(args.shift().substring(2, 20));
        if(!member)
            return message.reply(messages.couldNotFind);
        if(!member.kickable)
            return message.reply(messages.couldNotKick);

        member.kick().then((member: GuildMember): void => {
            member.user.send(
                messages.youWereKicked.replace('{}', message.guild.name)
                + args.length > 0 ? ': ' + args.join(' ') : ''
            );

            message.reply(messages.kicked.replace('{}', member.user.username));
        });
    }
}
