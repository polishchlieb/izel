import Command from '../interfaces/command';
import { Message, GuildMember, RichEmbed } from 'discord.js';
import Messages from '../interfaces/messages';

export default class AvatarCommand implements Command {
    info = {
        names: ['avatar', 'av'],
        description: 'Displays avatar',
        usage: '&avatar (mention)'
    };

    run(message: Message, []: string[], messages: Messages): void {
        let member: GuildMember = message.mentions.members.first();
        if(!member) member = message.member;

        message.channel.send(new RichEmbed()
            .setImage(member.user.displayAvatarURL)
            .setColor('RANDOM'));
    }
}