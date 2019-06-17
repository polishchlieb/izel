import Command from '../interfaces/command';
import { Message, RichEmbed, Channel } from 'discord.js';
import bot from '..';

export default class GreetingCommand implements Command {
    info = {
        names: ['greeting'],
        description: 'Sets server\'s greeting',
        usage: '&greeting (greeting / goodbye / placeholders) (channel mention) {text..}',
        category: 'admin'
    };

    async run(message: Message, args: string[], messages: any): Promise<any> {
        let [ type, mention, ...content ] = args;

        if(!type || !mention)
            return message.reply(`${messages.use} \`${this.info.usage}\``);
        if(!message.member.hasPermission('MANAGE_CHANNELS'))
            return message.reply(messages.noPermission);

        if(type == 'placeholders')
            return message.channel.send(new RichEmbed()
                .setTitle(messages.placeholders)
                .setDescription('%m - user mention\n%u - username')
                .setColor('RED')
                .setFooter(
                    `${messages.requestedBy} ${message.member.displayName}`,
                    message.author.avatarURL
                ));

        if(!mention.match(/<#[0-9]{18}>/))
            return message.reply(`${messages.use} \`${this.info.usage}\``);
        let channel: Channel = message.guild.channels.get(mention.substring(2, 20));
        if(!channel)
            return message.reply(`${messages.use} \`${this.info.usage}\``);
        if(channel.type != 'text')
            return message.reply(messages.mustBeText);
        
        if(!content.length) // content.length == 0
            return message.reply(`${messages.use} \`${this.info.usage}\``);
       
        if(type == 'greeting' || type == 'goodbye')
            bot.servers.updateOne({ id: message.guild.id }, {
                $set: { [type]: {
                    channel: channel.id,
                    content
                }}
            }).then((): void => {
                message.react('✅');
            });
        else message.reply(`${messages.use} \`${this.info.usage}\``);
    }
}