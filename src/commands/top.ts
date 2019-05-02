import Command from '../interfaces/command';
import { Message, RichEmbed, GuildMember } from 'discord.js';
import bot from '..';

export default class TopCommand implements Command {
    info = {
        names: ['top', 'leaderboard'],
        description: 'Topka serwerkowa',
        usage: 'top'
    }

    async run(message: Message, args: string[]): Promise<void> {
        let data: any[] = await bot.database.collection(message.guild.id)
            .find()
            .sort({ messages: -1 }).limit(10).toArray();

        let embed: RichEmbed = new RichEmbed()
            .setTitle('Top 10 pionkow')
            .setColor('RANDOM');

        data.forEach((user: any, i: number) => {
            let member: GuildMember = message.guild.member(user.id);
            if(member)
                embed.addField(
                    `${i + 1}. ${member.displayName}`,
                    `${user.messages} wiadomosci`
                );
        });

        message.channel.send(embed);
    }
}