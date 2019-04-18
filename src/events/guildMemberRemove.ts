import { Event } from '../interfaces/event';
import { GuildMember, GuildChannel, TextChannel } from 'discord.js';

export class GuildMemberRemoveEvent implements Event {
    name = 'guildMemberRemove';

    run(member: GuildMember): void {
        
    }
}