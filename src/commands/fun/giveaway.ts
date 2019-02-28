import { Command } from '../../interfaces/command';
import { Client, Message, RichEmbed } from 'discord.js';
import { parseTime } from '../../utils/timeParser';

export class GiveawayCommand implements Command {
    info = {
        names: ['giveaway'],
        description: 'Calls a giveaway',
        usage: 'giveaway (time) (topic..)'
    }

    async run(bot: Client, message: Message, args: string[]) {
        if(args.length < 2)
            return message.reply(`use: \`${this.info.usage}\``);

        const time = parseTime(args.shift());
        if(!time)
            return message.reply(`use: \`${this.info.usage}\``);

        const msg = await message.channel.send(new RichEmbed()
            .setTitle('Giveaway')
            .setDescription(args.join())
            .setFooter('React 🍞 to join'));

        if(!(msg instanceof Message))
            return;

        msg.react('🍞');

        setTimeout(() => {
            msg.reactions.find(r => r.emoji.toString() === '🍞').fetchUsers().then(reacted => {
                reacted = reacted.filter(r => r.id != bot.user.id
                    && message.guild.members.has(random.id));

                const random = reacted.random();

                if(!random)
                    message.reply('nobody reacted to the giveaway message')
                        .then(() => msg.edit(new RichEmbed()
                            .setTitle('GIVEAWAY ENDED')
                            .setDescription(`Nobody reacted`)
                            .setColor('BLACK')));

                else message.channel.send(`${random.toString()} won the ${args.join(' ')} giveaway, congratulations! :tada:`)
                    .then(() => msg.edit(new RichEmbed()
                        .setTitle('GIVEAWAY ENDED')
                        .setDescription(`Winner: ${random.toString()}`)
                        .setColor('BLACK')));
            });
        }, time);
    }
}