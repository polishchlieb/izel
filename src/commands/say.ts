import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';
import { Permission } from '../interfaces/databaseStructures';
import Messages from '../interfaces/messages';

export default class SayCommand implements Command {
    info = {
        names: ['say'],
        description: 'it shouldn\'t be here',
        usage: '&say something',
        category: 'developer'
    };

    async run(message: Message, args: string[], { noPermission }: Messages): Promise<any> {
        let permissions: Permission = await bot.permissions.findOne({ action: 'say' });
        if(!permissions.user_ids.includes(message.author.id))
            return message.reply(noPermission);

        message.channel.send(args.join(' '));
        message.delete();
    }
}
