import { Event } from '../interfaces/event';
import { bot } from '..';
import { GuildMember, TextChannel } from 'discord.js';

export class GuildMemberAddEvent implements Event {
    name = 'guildMemberAdd';

    run(member: GuildMember) {
        if(bot.guildData[member.guild.id] && bot.guildData[member.guild.id].autoRole)
            member.addRole(bot.guildData[member.guild.id].autoRole);

        if(bot.guildData[member.guild.id] && bot.guildData[member.guild.id].greeting) {
            const g = bot.guildData[member.guild.id].greeting,
            c = member.guild.channels.get(g[0]);

            if(g[0] == 'dm')
                member.user.send(g[1]);
            else if(c && c.type === 'text')
                (c as TextChannel).send(g[1]);
        }
    }
}