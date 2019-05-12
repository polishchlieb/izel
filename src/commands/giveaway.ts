import { Message, RichEmbed, MessageReaction, User, Collection } from 'discord.js';
import Command from '../interfaces/command';
import parseTime from '../utils/timeParser';
import bot from '..';

export default class GiveawayCommand implements Command {
    info = {
        names: ['giveaway'],
        description: 'Calls a giveaway',
        usage: '&giveaway (time) (topic..)'
    }

    reactions: string[] = ['🍞'];

    async run(message: Message, args: string[], messages: any): Promise<any> {
        if(args.length < 2)
            return message.reply(`${messages.use} ${this.info.usage}`);

        let time: number | false = parseTime(args.shift());
        if(!time)
            return message.reply(`${messages.use} ${this.info.usage}`);

        let reaction: string
            = this.reactions[Math.floor(Math.random() * this.reactions.length)];

        let giveaway: Message | Message[] = await message.channel.send(
            new RichEmbed()
                .setTitle('GIVEAWAY')
                .setColor('RANDOM')
                .setDescription(`${args.join(' ')}\n${messages.reactGiveaway.replace('{}', reaction)}`)
        );
        if(!(giveaway instanceof Message)) return;
        
        giveaway.react(reaction);

        setTimeout((): void => {
            if(!(giveaway instanceof Message)) return;

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

                    if(!winner)
                        return message.reply(messages.nobodyReacted);
                    if(!(giveaway instanceof Message)) return;
                    
                    giveaway.edit(new RichEmbed()
                        .setTitle(messages.giveawayEnded)
                        .setDescription(`${messages.winner}: ${winner.toString()}`));
                    
                    message.channel.send(`${winner.toString()} ${messages.won.replace('{}', args.join(' '))}`);
                });
        }, time);
    }
}