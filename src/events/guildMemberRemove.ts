import Event from '../interfaces/event';
import { GuildMember, GuildChannel } from 'discord.js';
import { Channel } from '../interfaces/databaseStructures';
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
    }
}