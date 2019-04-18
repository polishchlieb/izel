import { Event } from '../interfaces/event';
import { bot } from '..';
import { Guild } from 'discord.js';

export class GuildDeleteEvent implements Event {
    name = 'guildDelete';

    run(guild: Guild): void {
        bot.database.collection(guild.id).drop();
    }
}