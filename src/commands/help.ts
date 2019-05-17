import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import bot from '..';

export default class HelpCommand implements Command {
    info = {
        names: ['help'],
        description: 'Shows help',
        usage: '&help'
    }

    run(message: Message, args: string[], messages: any): void {
        message.channel.send(new RichEmbed()
            .setTitle(messages.help)
            .setDescription(messages.helpDescription)
            .setURL('http://izel.chlebe.tk/commands')
            .setThumbnail(bot.client.user.avatarURL)
            .addField('Webpanel', 'http://izel.chlebe.tk/')
            .setFooter(`${messages.requestedBy} ${message.member.displayName}`));
    }
}