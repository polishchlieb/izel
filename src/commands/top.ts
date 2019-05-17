import Command from '../interfaces/command';
import { Message, RichEmbed, GuildMember } from 'discord.js';
import bot from '..';

export default class TopCommand implements Command {
    info = {
        names: ['top', 'leaderboard'],
        description: 'Topka serwerkowa',
        usage: 'top'
    }

    async run(message: Message, _args: string[], messages: any): Promise<void> {
        let data: any[] = await bot.users
            .find({ guild: message.guild.id })
            .sort({ messages: -1 }).limit(10).toArray();

        let embed: RichEmbed = new RichEmbed()
            .setTitle(messages.top)
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