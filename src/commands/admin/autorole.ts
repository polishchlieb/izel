import { Command } from '../../interfaces/command';
import { Client, Message } from 'discord.js';
import { bot as client } from '../..';

export class AutoroleCommand implements Command {
    info = {
        names: ['autorole'],
        description: 'Assigns a role automatically when an user joins the server',
        usage: 'autorole'
    }

    run(bot: Client, message: Message, args: string[]) {
        if(!client.guildData[message.guild.id])
            client.setGuildData(message.guild.id, {});

        const role = message.guild.roles.find(r => r.name.toLowerCase().includes(args.join(' ').toLowerCase()));
        if(!role)
            return message.reply('role doesn\'t exist');
        if(role.position >= message.guild.me.highestRole.position)
            return message.reply('cannot make an autorole higher or equal to bot\'s highest role');

        client.guildData[message.guild.id].autoRole = role.id;
        client.save();
        message.reply(`set the autorole to \`${role.name}\``);
    }
}