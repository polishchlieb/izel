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
        if (args.length < 2)
            return message.reply(`${messages.use} ${this.info.usage}`);

        let time: Time = new Time(args.shift());
        if (time.invalid)
            return message.reply(`${messages.use} ${this.info.usage}`);

        let reaction: string = '🍞';

        const giveaway = await message.channel.send(
            new RichEmbed()
                .setTitle('GIVEAWAY')
                .setColor('RANDOM')
                .setDescription(`
                ${args.join(' ')}

                ${messages.reactGiveaway.replace('{}', reaction)}
                ${messages.endsIn} ${time.raw}
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
                    let winner: User = users
                        .filter((u: User): boolean => {
                            return message.guild.members.has(u.id)
                                && bot.client.user.id != u.id;
                        })
                        .random();

                    if (!winner) return message.reply(messages.nobodyReacted);
                    if (!(giveaway instanceof Message)) return;
                    
                    giveaway.edit(new RichEmbed()
                        .setTitle(messages.giveawayEnded)
                        .setDescription(`${messages.winner}: ${winner.toString()}`));
                    
                    message.channel.send(`${winner.toString()} ${messages.won.replace('{}', args.join(' '))}`);
                });
        }, time.ms);
    }
}