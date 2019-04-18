import { Event } from '../interfaces/event';
import { GuildMember, TextChannel, Attachment, GuildChannel } from 'discord.js';
import fetch from 'node-fetch';

export class GuildMemberAddEvent implements Event {
    name = 'guildMemberAdd';

    run(member: GuildMember): void {
        
    }
}