import Event from '../interfaces/event';
import { GuildMember, GuildChannel, TextChannel } from 'discord.js';
import bot from '..';

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
    }
}