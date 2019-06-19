import Event from '../interfaces/event';
import { GuildMember, GuildChannel, TextChannel } from 'discord.js';
import { Channel, Server } from '../interfaces/databaseStructures';
import bot from '..';

export default class GuildMemberRemoveEvent implements Event {
    name = 'guildMemberRemove';

    async run(member: GuildMember): Promise<void> {
        let m_channels: Channel[] = await bot.channels.find({ guild: member.guild.id }).toArray();
        m_channels.forEach((mc: Channel): void => {
            let c: GuildChannel = member.guild.channels.get(mc.id);
            if(c) c.setName(mc.name.split('%m').join(member.guild.memberCount.toString()));
            else bot.channels.deleteOne({ id: mc.id });
        });

        let { goodbye }: Server = await bot.servers.findOne({ id: member.guild.id });

        if(!goodbye) return;
        let channel: GuildChannel = member.guild.channels.get(goodbye.channel);
        if(channel && channel instanceof TextChannel)
            channel.send(goodbye.content
                .split('%m').join(member.user.toString())
                .split('%u').join(member.user.username));
    }
}