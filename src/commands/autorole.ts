import Command from '../interfaces/command';
import { Message, Role } from 'discord.js';
import bot from '..';
import Messages from '../interfaces/messages';

export default class AutoRoleCommand implements Command {
    info = {
        names: ['autorole'],
        description: 'Set a role to give a new member (also called Ra\'Ank)',
        usage: '&autorole (role name..)',
        category: 'admin'
    };

    run(message: Message, args: string[], { noPermission, noSuchRole }: Messages): any {
        if(!message.member.hasPermission('MANAGE_ROLES'))
            return message.reply(noPermission);
        
        if(args[0] == 'remove')
            bot.servers.updateOne({ id: message.guild.id }, {
                $set: {
                    autorole: null
                }
            }).then((): void => {
                message.react('✅');
            });
        else {
            let role: Role = message.guild.roles.find(
                (r: Role): boolean => r.name.toLowerCase() == args.join(' ').toLowerCase()
            );
            if(!role)
                return message.reply(noSuchRole);

            bot.servers.updateOne({ id: message.guild.id }, {
                $set: {
                    autorole: role.id
                }
            }).then((): void => {
                message.react('✅');
            });
        }
    }
}