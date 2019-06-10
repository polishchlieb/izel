import Event from '../interfaces/event';
import { GuildMember, GuildChannel, TextChannel } from 'discord.js';
import bot from '..';
import { Channel } from '../interfaces/databaseStructures';

export default class GuildMemberAddEvent implements Event {
    name = 'guildMemberAdd';

    async run(member: GuildMember): Promise<void> {
        let { autorole, greeting }: { autorole?: string, greeting?: {
            channel: string,
            content: string
        }} = await bot.servers.findOne({ id: member.guild.id });

        if(autorole && member.guild.roles.has(autorole))
            member.addRole(autorole);

        if(!greeting) return;
        let channel: GuildChannel = member.guild.channels.get(greeting.channel);
        if(greeting && channel && channel instanceof TextChannel)
            channel.send(greeting.content
                .split('%m').join(member.user.toString())
                .split('%u').join(member.user.username));
        
        let m_channels: Channel[] = await bot.channels.find({ guild: member.guild.id }).toArray();
        m_channels.forEach((mc: Channel): void => {
            let c: GuildChannel = member.guild.channels.get(mc.id);
            if(c) c.setName(mc.name.split('%m').join(member.guild.memberCount.toString()));
            else bot.channels.deleteOne({ id: mc.id });
        });
    }
}