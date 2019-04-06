import { Event } from '../interfaces/event';
import { GuildMember } from 'discord.js';

export class GuildMemberAddEvent implements Event {
    name = 'guildMemberAdd';

    run(member: GuildMember) {
        
    }
}