import Event from '../interfaces/event';
import { GuildMember } from 'discord.js';
import bot from '..';

export default class GuildMemberAddEvent implements Event {
    name = 'guildMemberAdd';

    async run(member: GuildMember): Promise<void> {
        let { autorole }: { autorole?: string } = await bot.servers.findOne({ id: member.guild.id });
        if(autorole && member.guild.roles.has(autorole))
            member.addRole(autorole);
    }
}