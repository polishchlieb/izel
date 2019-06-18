import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import Messages from '../interfaces/messages';

export default class ServerInfoCommand implements Command {
    info = {
        names: ['serverinfo'],
        description: 'Shows info about the server',
        usage: '&serverinfo',
        category: 'tool'
    };

    run(message: Message, []: string[], messages: Messages): void {
        message.channel.send(new RichEmbed()
            .setTitle(message.guild.name)
            .addField('ID', message.guild.id, true)
            .addField(messages.owner, message.guild.owner.user.tag, true)
            .addField(messages.members, message.guild.memberCount, true)
            .addField(messages.channels, message.guild.channels.size, true)
            .addField(messages.region, message.guild.region, true)
        );
    }
}
