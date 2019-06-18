import Event from '../interfaces/event';
import { Guild, RichEmbed } from 'discord.js';

export default class GuildCreateEvent implements Event {
    name = 'guildCreate';

    embed: RichEmbed = new RichEmbed()
        .setTitle('Welcome!')
        .setColor('GREEN')
        .setDescription('ahoj comrade!')
        .setURL('http://izel.chlebe.tk');

    async run(guild: Guild): Promise<void> {
        guild.owner.send(this.embed);
    }
}