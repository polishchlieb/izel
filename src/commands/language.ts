import { Message } from 'discord.js';
import Command from '../interfaces/command';
import bot from '..';

export default class LanguageCommand implements Command {
    info = {
        names: ['language', 'lang'],
        description: 'Changes the language',
        usage: '&language (id)',
        category: 'admin'
    }

    available: string[] = ['pl', 'en'];

    run(message: Message, args: string[], messages: any): any {
        if(args.length != 1 || !this.available.includes(args[0]))
            return message.reply(`${messages.use}: \`${this.info.usage}\``);
        if(!message.member.hasPermission('ADMINISTRATOR') && message.author.id != '372459063339909120')
            return message.reply(messages.noPermission);

        bot.servers.updateOne({
            id: message.guild.id
        }, {
            $set: {
                language: args[0]
            }
        });

        message.reply(`${messages.setLanguage} ${args[0]}`);
    }
}