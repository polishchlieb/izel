import { Message } from 'discord.js';
import Command from '../interfaces/command';
import bot from '..';
import Messages from '../interfaces/messages';

export default class LanguageCommand implements Command {
    info = {
        names: ['language', 'lang'],
        description: 'Changes the language',
        usage: 'language (id)',
        category: 'admin'
    };

    available: string[] = ['pl', 'en'];

    run(message: Message, args: string[], messages: Messages): any {
        if(args.length != 1 || !this.available.includes(args[0]))
            return message.reply(`${messages.use}: \`${this.info.usage}\`\n${messages.availableLanguages} \`${this.available.toString()}\``);
        if(!message.member.hasPermission('ADMINISTRATOR'))
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