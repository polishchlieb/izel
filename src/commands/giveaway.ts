import { Message, RichEmbed, MessageReaction, User, Collection } from 'discord.js';
import Command from '../interfaces/command';
import Time from '../utils/timeParser';
import bot from '..';
import Messages from '../interfaces/messages';

export default class GiveawayCommand implements Command {
    info = {
        names: ['giveaway'],
        description: 'Calls a giveaway',
        usage: '&giveaway (time) (topic..)',
        category: 'tool'
    };

    async run(message: Message, args: string[], messages: Messages): Promise<any> {
        const filter = (m: Message) =>
            m.author.id == message.author.id && message.channel.id == m.channel.id;

        const collector = message.channel.createMessageCollector(filter, {
            time: 120000
        });

        let stage = 1;
        const data = {
            channel: '',
            time: <Time>null,
            topic: '',
            winners: 0,
            finished: false
        };

        message.reply(messages.giveaway.stage1);

        collector.on('collect', (m) => {
            if (stage == 1) {
                if (!m.mentions.channels.size)
                    return m.react('❓');

                data.channel = m.mentions.channels.first().id;
                m.react('✅');
                m.reply(messages.giveaway.stage2);
            } else if (stage == 2) {
                let time: Time = new Time(m.content);
                if (time.invalid)
                    return m.reply('❓');

                data.time = time;
                m.react('✅');
                m.reply(messages.giveaway.stage3);
            } else if (stage == 3) {
                data.topic = m.content;
                m.react('✅');
                m.reply(messages.giveaway.stage4);
            } else if (stage == 4) {
                let winners = parseInt(m.content);
                if (isNaN(winners))
                    return m.reply('❓');

                data.winners = winners;
                data.finished = true;
                m.react('✅');
                collector.stop();
            }
        });

        if (!data.finished)
            return;

        const reaction: string = '🍞';

        const giveaway = await message.channel.send(
            new RichEmbed()
                .setTitle('Giveaway')
                .setColor('RANDOM')
                .setDescription(`
                ${args.join(' ')}

                ${messages.reactGiveaway.replace('{}', reaction)}
                ${messages.endsIn} ${data.time.raw}
                `)
        ) as Message;

        giveaway.react(reaction);

        setTimeout((): void => {
            giveaway.reactions
                .find((r: MessageReaction): boolean => {
                    return r.emoji.toString() == reaction;
                })
                .fetchUsers()
                .then((users: Collection<string, User>): any => {
                    let winner: User[] = users
                        .filter((u: User): boolean => {
                            return message.guild.members.has(u.id)
                                && bot.client.user.id != u.id;
                        })
                        .random(data.winners);

                    if (!winner) return message.reply(messages.nobodyReacted);
                    if (!(giveaway instanceof Message)) return;
                    
                    giveaway.edit(new RichEmbed()
                        .setTitle(messages.giveawayEnded)
                        .setDescription(`${messages.winner}: ${winner.toString()}`));
                    
                    message.channel.send(`${winner.toString()} ${messages.won.replace('{}', args.join(' '))}`);
                });
        }, data.time.ms);
    }
}