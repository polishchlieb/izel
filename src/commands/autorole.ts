import Command from '../interfaces/command';
import { Message, Role } from 'discord.js';
import bot from '..';

export default class AutoRoleCommand implements Command {
    info = {
        names: ['autorole'],
        description: 'Auto rolllle (also called Ra\'Ank)',
        usage: '&autorole (role name..)'
    }

    run(message: Message, args: string[], messages: any): any {
        if(!message.member.hasPermission('MANAGE_ROLES'))
            return message.reply(messages.noPermission);
        
        let role: Role = message.guild.roles.find(
            (r: Role): boolean => r.name.toLowerCase() == args.join(' ').toLowerCase()
        );
        if(!role)
            return message.reply(messages.noSuchRole);

        bot.servers.updateOne({ id: message.guild.id }, {
            $set: {
                autorole: role.id
            }
        }).then((): void => {
            message.react('✅');
        });
    }
}