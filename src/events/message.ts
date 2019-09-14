import { Message, GuildChannel } from 'discord.js';
import Event from '../interfaces/event';
import bot from '..';
import Command from '../interfaces/command';
import { StatUser, Server } from '../interfaces/databaseStructures';
import isGreeting from '../utils/isGreeting';
import Messages from '../interfaces/messages';

const msgs: { pl: Messages, en: Messages } = {
    pl: require('../../languages/pl.json'),
    en: require('../../languages/en.json')
};

const { id }: { id: string } = require('../../config.json');

export default class MessageEvent implements Event {
    name = 'message';

    async run(message: Message): Promise<any> {
        if (message.author.bot || !message.guild) return;

        let options: Server = await bot.servers.findOne({
            id: message.guild.id
        });

        if(!options)
            bot.servers.insertOne(options = {
                id: message.guild.id,
                language: 'en',
                prefix: '&',
                ranking: true
            });

        if (!message.content.startsWith(options.prefix) && !(message.content.startsWith(`<@${id}> `) || message.content.startsWith(`<@!${id}> `))) {
            if (message.content === `<@${id}>` || message.content === `<@!${id}>`)
                return message.channel.send(`${msgs[options.language].myPrefix} ${options.prefix}`);
 
            if (isGreeting(message.content) && message.guild.id != '264445053596991498') // 'Discord Bot List' server
                message.react('👋');

            let data: StatUser = await bot.stats.findOne({
                id: message.author.id,
                guild: message.guild.id
            });

            if (!data)
                bot.stats.insertOne({
                    id: message.author.id,
                    guild: message.guild.id,
                    level: 1,
                    points: 1,
                    cooldown: new Date().getTime()
                });
            else {
                if (new Date().getTime() - data.cooldown >= 60000) {
                    const tg = determinePoints();
                    data.points += tg;
                    data.cooldown = new Date().getTime();

                    let curLevel = 0.1 * Math.sqrt(data.points);
                    if (curLevel > data.level) {
                        data.level += 1;
                        if(options.ranking && message.guild.id != '264445053596991498') {
                            let messages = msgs[options.language];
                            message.reply(
                                messages.nextLevel.replace('{}', data.level)
                            );
                        }
                    }
                }

                bot.stats.updateOne({
                    id: message.author.id,
                    guild: message.guild.id
                }, {
                    $set: data
                });
            }
        } else {
            let messages: Messages;
            
            if (message.guild.id == '485437978315849748' && (message.channel as GuildChannel).parent) {
                if ((message.channel as GuildChannel).parent.id == '544504580302438421')
                    messages = msgs.en;
                else if ((message.channel as GuildChannel).parent.id == '544504706005860362')
                    messages = msgs.pl;
                else messages = msgs[options.language];
            } else messages = msgs[options.language];

            let args: string[];
            if(message.content.startsWith('<@470345804075237396> '))
                args = message.content.substring(22).split(' ');
            else args = message.content.substring(options.prefix.length).split(' ');
            
            const name: string = args.shift().toLowerCase();
            const command: Command = bot.commands.find((c: Command): boolean =>
                c.info.names.includes(name)
            );

            if(command)
                command.run(message, args, messages);
            else message.react('❓');
        }
    }
}

const determinePoints = (): number => {
    const now = new Date(Date.now());
    const weekday = now.getDay();
    const hour = now.getHours();
    const month = now.getMonth();

    let rndm = Math.floor(Math.random() * (10 - 5 + 1) + 5);

    return Math.floor(rndm * days(weekday, hour, month));
}

const days = (weekday, hour, month): number => {
    if (weekday > 5 || month == 6 || month == 7) { // weekend or summer holidays
        switch (true) {
            case (hour < 3): return 0.7;
            case (hour < 9): return 1;
            case (hour < 11): return 0.7;
            case (hour < 14): return 0.9;
            case (hour < 19): return 0.7;
            case (hour < 24): return 0.5;
            default: return 1;
        }
    } else { // tydzień
        switch (true) {
            case (hour < 2): return 0.9;
            case (hour < 6): return 1;
            case (hour < 14): return 0.9;
            case (hour < 18): return 0.7;
            case (hour < 24): return 0.5;
            default: return 1;
        }
    }
}