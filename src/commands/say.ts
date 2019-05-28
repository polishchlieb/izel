import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';
import { Permission } from '../interfaces/databaseStructures';

export default class SayCommand implements Command {
    info = {
        names: ['say'],
        description: 'only for the izel\'s government',
        usage: '&say something'
    }

    async run(message: Message, args: string[], messages: any): Promise<any> {
        let permissions: Permission = await bot.permissions.findOne({ action: 'say' });
        if(!permissions.user_ids.includes(message.author.id))
            return message.reply(messages.noPermission);

        message.channel.send(args.join(' '));
        message.delete();
    }
}
