import Command from '../interfaces/command';
import { Message, RichEmbed, GuildMember, Guild } from 'discord.js';
import bot from '..';
import { StatUser } from '../interfaces/databaseStructures';

export default class TopCommand implements Command {
    info = {
        names: ['top', 'leaderboard'],
        description: 'Topka serwerkowa',
        usage: '&top { global }'
    }

    async run(message: Message, args: string[], messages: any): Promise<void> {
        if(args[0] == 'global') {
            let data: StatUser[] = await bot.stats
                .find().sort({ messages: -1 }).limit(10).toArray();
            let embed: RichEmbed = new RichEmbed()
                .setTitle(messages.top)
                .setColor('RANDOM');

            data.forEach((user: StatUser, i: number): void => {
                let guild: Guild = bot.client.guilds.get(user.guild);
                if(guild) {
                    let member: GuildMember = guild.member(user.id);
                    if(member)
                        embed.addField(
                            `${i + 1}. ${member.displayName} (${guild.name})`,
                            `${user.messages} ${messages.messages}`
                        );
                }
            });

            message.channel.send(embed);
        } else {
            let data: StatUser[] = await bot.stats
                .find({ guild: message.guild.id }).sort({ messages: -1 })
                .limit(10).toArray();
            let embed: RichEmbed = new RichEmbed()
                .setTitle(messages.top)
                .setColor('RANDOM');

            data.forEach((user: StatUser, i: number): void => {
                let member: GuildMember = message.guild.member(user.id);
                if(member)
                    embed.addField(
                        `${i + 1}. ${member.displayName}`,
                        `${user.messages} ${messages.messages}`
                    );
            });

            message.channel.send(embed);
        }
    }
}