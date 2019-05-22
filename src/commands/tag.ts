import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import bot from '..';

export default class TagCommand implements Command {
    info = {
        names: ['tag'],
        description: 'taggo',
        usage: '&tag (title) {description..}'
    }

    async run(message: Message, args: string[], messages: any): Promise<any> {
        if(args[0] == 'list') {
            message.channel.send(new RichEmbed()
                .setTitle(messages.tags)
                .setDescription(
                    (await bot.tags.find({
                        server: message.guild.id
                    }).toArray()).map((e: any): string => e.title).join('\n')
                )
                .setFooter(`${messages.requestedBy} ${message.member.displayName}`, message.author.avatarURL)
                .setColor('RANDOM')
            );
        } else if(args.length == 1) {
            let tag: any = await bot.tags.findOne({
                server: message.guild.id,
                title: args[0]
            });

            if(!tag)
                return message.reply(messages.tagNotFound);
            else message.channel.send(tag.content);
        } else if(args.length > 1 && (message.member.hasPermission('MANAGE_MESSAGES')
                  || message.author.id == '372459063339909120')) {
            bot.tags.insertOne({
                server: message.guild.id,
                title: args.shift(),
                content: args.join(' ')
            });

            message.reply(messages.tagAdded);
        } else {
            message.reply(':shrug:');
        }
    }
}
