import Event from '../interfaces/event';
import { GuildMember } from 'discord.js';

export default class GuildMemberRemoveEvent implements Event {
    name = 'guildMemberRemove';

    run(member: GuildMember): void {
        
    }
}