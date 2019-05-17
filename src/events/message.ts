import { Message } from 'discord.js';
import Event from '../interfaces/event';
import bot from '..';
import Command from '../interfaces/command';

const msgs: any = {
    pl: require('../../languages/pl.json'),
    en: require('../../languages/en.json')
}

export default class MessageEvent implements Event {
    name = 'message';

    async run(message: Message): Promise<void> {
        if(message.author.bot
           || !message.guild) return;

        let data: any = await bot.users.findOne({
            id: message.author.id,
            guild: message.guild.id
        });

        let options: any = await bot.servers.findOne({
            id: message.guild.id
        });

        if(!options)
            bot.servers.insertOne(options = {
                id: message.guild.id,
                language: 'en'
            });

        let messages = msgs[options.language];

        if(!data)
            bot.users.insertOne({
                id: message.author.id,
                guild: message.guild.id,
                messages: 1,
                level: 0
            });

        else {
            if(data.messages % 200 == 0)
                message.reply(
                    messages.nextLevel.replace('{}', data.level += 1)
                );
            
            bot.users.updateOne({
                id: message.author.id,
                guild: message.guild.id
            }, {
                $set: {
                    messages: data.messages + 1,
                    level: data.level
                }
            });
        }

        if(!message.content.startsWith('&'))
            return;

        let args: string[] = message.content
            .substring(1)
            .split(' ');
        let name: string = args.shift().toLowerCase();
        let command: Command = bot.commands.find((c: Command) =>
            c.info.names.includes(name)
        );

        if(command)
            command.run(message, args, messages);
        else message.react('❓');
    }
}