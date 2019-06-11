import Command from '../interfaces/command';
import { Message, GuildChannel } from 'discord.js';
import bot from '..';
import { Channel as DChannel } from '../interfaces/databaseStructures';

export default class ChannelCommand implements Command {
    info = {
        names: ['channel', 'stat'],
        description: 'Creates member-count channel',
        usage: '&channel (current name) (name..)',
        category: 'admin'
    }

    async run(message: Message, [ curr, ...arg ]: string[], messages: any): Promise<any> {
        let name: string = arg.join(' ');
        if(!curr || name.length == 0)
            return message.reply(`${messages.use} \`${this.info.usage}\``);
        
        let channel: GuildChannel = message.guild.channels.find(
            (c: GuildChannel): boolean => c.name == curr
        );
        if(!channel) message.reply(`${messages.use} \`${this.info.usage}\``);
        if(channel.type != 'voice') message.reply(messages.mustBeVoice);

        let test: DChannel = await bot.channels.findOne({ id: channel.id });
        
        if(test) bot.channels.updateOne({ id: channel.id }, { $set: { name } });
        else bot.channels.insertOne({ id: channel.id, name, guild: message.guild.id });
        message.react('✅');

        channel.setName(name.split('%m').join(message.guild.memberCount.toString()));
    }
}