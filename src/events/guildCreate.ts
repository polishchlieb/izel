import Event from '../interfaces/event';
import { Guild } from 'discord.js';
import bot from '..';

export default class GuildCreateEvent implements Event {
    name = 'guildCreate';

    async run(guild: Guild): Promise<void> {
        // Creates collection if it doesn't exist
        await bot.database.collection(guild.id);

        await bot.database.collection(guild.id).insertOne({
            options: true,
            prefix: '&',
            language: 'en'
        });
    }
}