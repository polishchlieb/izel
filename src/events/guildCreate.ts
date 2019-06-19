import Event from '../interfaces/event';
import { Guild, RichEmbed } from 'discord.js';
const { dashboard } = require('../../config.json');

export default class GuildCreateEvent implements Event {
    name = 'guildCreate';

    embed: RichEmbed = new RichEmbed()
        .setTitle('Welcome!')
        .setColor('GREEN')
        .setDescription('ahoj comrade!')
        .setURL(dashboard);

    async run(guild: Guild): Promise<void> {
        guild.owner.send(this.embed);
    }
}