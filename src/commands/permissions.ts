import { Message } from 'discord.js';
import Command from '../interfaces/command';
import bot from '..';

export default class MathCommand implements Command {
    info = {
        names: ['permissions'],
        description: 'only for the izel\'s government',
        usage: '&permissions (action) (permission) { id }'
    }

    async run(message: Message, args: string[], messages: any): Promise<any> {
        if(message.author.id != '372459063339909120')
            return message.reply(messages.noPermission);

        if(args[0] == 'create')
            bot.permissions.insertOne({ action: args[1], user_ids: [] });
        else if(args[0] == 'add') {
            let permission: any = await bot.permissions.findOne({ action: args[1] });
            permission.user_ids.push(args[2]);
            bot.permissions.updateOne({ action: args[1] }, { $set: permission });
        } else if(args[0] == 'set') {
            let permission: any = await bot.permissions.findOne({ action: args[1] });
            permission.user_ids = args[2].split(',');
            bot.permissions.updateOne({ action: args[1] }, { $set: permission });
        } else if(args[0] == 'remove') {
            let permission: any = await bot.permissions.findOne({ action: args[1] });
            permission.user_ids.splice(permission.user_ids.indexOf(args[2]), 1);
            bot.permissions.updateOne({ action: args[1] }, { $set: permission });
        } else if(args[0] == 'list') {
            let permission: any = await bot.permissions.findOne({ action: args[1] });
            message.reply(permission.user_ids.map(
                (id: string): string => bot.client.users.get(id).tag).join(', ')
            );
        }
    }
}
