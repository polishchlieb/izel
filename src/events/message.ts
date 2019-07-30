import { Message, GuildChannel } from 'discord.js';
import Event from '../interfaces/event';
import bot from '..';
import Command from '../interfaces/command';
import { StatUser, Server } from '../interfaces/databaseStructures';
import isGreeting from '../utils/isGreeting';
import Messages from '../interfaces/messages';

const msgs: any = {
    pl: require('../../languages/pl.json'),
    en: require('../../languages/en.json')
};

export default class MessageEvent implements Event {
    name = 'message';

    async run(message: Message): Promise<void> {
        if(message.author.bot
           || !message.guild) return;

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

        if(!message.content.startsWith(options.prefix) && !message.content.startsWith('<@470345804075237396> ')) {
            if(isGreeting(message.content)
               && message.guild.id != '264445053596991498') // 'Discord Bot List' server
                message.react('👋');

            let data: StatUser = await bot.stats.findOne({
                id: message.author.id,
                guild: message.guild.id
            });

            if(!data)
                bot.stats.insertOne({
                    id: message.author.id,
                    guild: message.guild.id,
                    messages: 1,
                    level: 0,
                    cooldown: new Date().getTime()
                });
            else {
                if(new Date().getTime() - data.cooldown >= 10000) {
                    data.messages += 1;
                    data.cooldown = new Date().getTime();

                    if(data.messages % 200 == 0) {
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
            
            if(message.guild.id == '485437978315849748' && (message.channel as GuildChannel).parent) {
                if((message.channel as GuildChannel).parent.id == '544504580302438421')
                    messages = msgs.en;
                else if((message.channel as GuildChannel).parent.id == '544504706005860362')
                    messages = msgs.pl;
                else messages = msgs[options.language];
            } else messages = msgs[options.language];

            let args: string[];
            if(message.content.startsWith('<@470345804075237396> '))
                args = message.content.substring(22).split(' ');
            else args = message.content.substring(options.prefix.length).split(' ');
            
            let name: string = args.shift().toLowerCase();
            let command: Command = bot.commands.find((c: Command): boolean =>
                c.info.names.includes(name)
            );

            if(command)
                command.run(message, args, messages);
            else message.react('❓');
        }
    }
}
