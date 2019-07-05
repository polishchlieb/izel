import Command from '../interfaces/command';
import { Message, RichEmbed, GuildMember, Guild } from 'discord.js';
import bot from '..';
import { StatUser } from '../interfaces/databaseStructures';
import Messages from '../interfaces/messages';

export default class TopCommand implements Command {
    info = {
        names: ['top', 'leaderboard'],
        description: 'Server activity top',
        usage: '&top { global }',
        category: 'stats'
    };

    async run(message: Message, args: string[], { top, messages }: Messages): Promise<void> {
        if(args[0] == 'global') {
            let data: StatUser[] = await bot.stats
                .find().sort({ messages: -1 }).limit(10).toArray();
            let embed: RichEmbed = new RichEmbed()
                .setTitle(top)
                .setColor('RANDOM');

            let ii = 0;
            data.forEach((user: StatUser, i: number): void => {
                let guild: Guild = bot.client.guilds.get(user.guild);
                if(guild) {
                    let member: GuildMember = guild.member(user.id);
                    if(member) {
                        ii++;
                        embed.addField(
                            `${ii}. ${member.displayName} (${guild.name})`,
                            `${user.messages} ${messages}`
                        );
                    }
                }
            });

            message.channel.send(embed);
        } else {
            let data: StatUser[] = await bot.stats
                .find({ guild: message.guild.id }).sort({ messages: -1 })
                .limit(10).toArray();
            let embed: RichEmbed = new RichEmbed()
                .setTitle(top)
                .setColor('RANDOM');

            let ii = 0;
            data.forEach((user: StatUser, i: number): void => {
                let member: GuildMember = message.guild.member(user.id);
                if(member) {
                    ii++;
                    embed.addField(
                        `${ii}. ${member.displayName}`,
                        `${user.messages} ${messages}`
                    );
                }
            });

            message.channel.send(embed);
        }
    }
}
