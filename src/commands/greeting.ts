import Command from '../interfaces/command';
import { Message, RichEmbed, Channel, VoiceChannel } from 'discord.js';
import bot from '..';

export default class GreetingCommand implements Command {
    info = {
        names: ['greeting'],
        description: 'Sets server\'s greeting',
        usage: '&greeting (channel mention / placeholders) { text.. }',
        category: 'admin'
    }

    async run(message: Message, args: string[], messages: any): Promise<any> {
        if(!args[0])
            return message.reply(`${messages.use} \`${this.info.usage}\``);

        if(args[0].toLowerCase() == 'placeholders')
            return message.channel.send(new RichEmbed()
                .setTitle(messages.placeholders)
                .setDescription('%m - user mention\n%u - username')
                .setColor('RED')
                .setFooter(`${messages.requestedBy} ${message.member.displayName}`, message.author.avatarURL));

        if(!args[0].match(/<#[0-9]{18}>/))
            return message.reply(`${messages.use} \`${this.info.usage}\``);
        let channel: Channel = message.guild.channels.get(args.shift().substring(2, 20));
        if(!channel)
            return message.reply(`${messages.use} \`${this.info.usage}\``);
        if(channel.type != 'text')
            return message.reply(messages.mustBeText);
        
        bot.servers.updateOne({ id: message.guild.id }, {
            $set: { greeting: {
                channel: channel.id,
                content: args.join(' ')
            }}
        }).then((): void => {
            message.react('✅');
        });
    }
}