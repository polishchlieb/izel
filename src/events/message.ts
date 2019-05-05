import { Message } from 'discord.js';
import Event from '../interfaces/event';
import bot from '..';
import { Collection } from 'mongodb';
import Command from '../interfaces/command';

const messages: any = {
    pl: require('../../languages/pl.json'),
    en: require('../../languages/en.json')
};

export default class MessageEvent implements Event {
    name = 'message';

    async run(message: Message): Promise<void> {
        if(message.author.bot
           || !message.guild) return;

        let collection: Collection<any> = bot.database.collection(message.guild.id);
        let data: any = await collection.findOne({ id: message.author.id });
        let options: any = await collection.findOne({ options: true });

        if(!data)
            collection.insertOne({
                id: message.author.id,
                messages: 1,
                level: 0
            });
        else collection.updateOne({ id: message.author.id }, {
            $set: {
                messages: data.messages + 1,
                level: data.messages % 200 == 0 ? data.level + 1 : data.level
            }
        });

        if(!message.content.startsWith(options.prefix))
            return;

        const args: string[] = message.content
            .substring(options.prefix.length)
            .split(' ');
        const name: string = args.shift().toLowerCase();
        const command: Command = bot.commands.find((c: Command) =>
            c.info.names.includes(name)
        );

        if(command)
            command.run(message, args, messages[options.language], options);
        else message.react('❓');
    }
}