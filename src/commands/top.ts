import Command from '../interfaces/command';
import { Message, RichEmbed, GuildMember, Guild } from 'discord.js';
import bot from '..';
import { StatUser } from '../interfaces/databaseStructures';
import Messages from '../interfaces/messages';
const { dashboard } = require('../../config.json');

export default class TopCommand implements Command {
    info = {
        names: ['top', 'leaderboard'],
        description: 'Server activity top',
        usage: '&top { global }',
        category: 'stats'
    };

    async run(message: Message, args: string[], { top, points, dashboardAd }: Messages): Promise<void> {
        if(args[0] == 'global') {
            let data: StatUser[] = await bot.stats
                .find().sort({ points: -1 }).toArray();
            let embed: RichEmbed = new RichEmbed()
                .setTitle(top)
                .setColor('RANDOM');

            let ii = 0;
            data.forEach((user: StatUser, i: number): void => {
                let guild: Guild = bot.client.guilds.get(user.guild);
                if(guild) {
                    let member: GuildMember = guild.member(user.id);
                    if(member && guild.id != '264445053596991498') {
                        ii++;
                        if(ii > 10) return;
                        embed.addField(
                            `${ii}. ${member.user.username} (${guild.name})`,
                            `${user.points} ${points}`
                        );
                    }
                }
            });

            message.channel.send(embed);
        } else {
            let data: StatUser[] = await bot.stats
                .find({ guild: message.guild.id }).sort({ points: -1 })
                .toArray();
            let embed: RichEmbed = new RichEmbed()
                .setTitle(top)
                .setColor('RANDOM');

            let ii = 0;
            data.forEach((user: StatUser, i: number): void => {
                let member: GuildMember = message.guild.member(user.id);
                if(member) {
                    ii++;
                    if (ii > 10) return;
                    embed.addField(
                        `${ii}. ${member.displayName}`,
                        `${user.points} ${points}`
                    );
                    embed.addField(dashboardAd, `${dashboard}/ranking/${message.guild.id}`)
                }
            });

            message.channel.send(embed);
        }
    }
}
