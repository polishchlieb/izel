import { Message, RichEmbed, User } from 'discord.js';
import Command from '../interfaces/command';
import { Permission } from '../interfaces/databaseStructures';
import bot from '..';

export default class MathCommand implements Command {
    info = {
        names: ['permissions'],
        description: 'only for the izel\'s government',
        usage: '&permissions (...)'
    }

    async run(message: Message, args: string[], messages: any): Promise<any> {
        if(message.author.id != '372459063339909120')
            return message.reply(messages.noPermission);

        // if(args[0] == 'create')
        //     bot.permissions.insertOne({ action: args[1], user_ids: [] });
        // else if(args[0] == 'add') {
        //     let permission: Permission = await bot.permissions.findOne({ action: args[1] });
        //     permission.user_ids.push(args[2]);
        //     bot.permissions.updateOne({ action: args[1] }, { $set: permission });
        // } else if(args[0] == 'set') {
        //     let permission: Permission = await bot.permissions.findOne({ action: args[1] });
        //     permission.user_ids = args[2].split(',');
        //     bot.permissions.updateOne({ action: args[1] }, { $set: permission });
        // } else if(args[0] == 'remove') {
        //     let permission: Permission = await bot.permissions.findOne({ action: args[1] });
        //     permission.user_ids.splice(permission.user_ids.indexOf(args[2]), 1);
        //     bot.permissions.updateOne({ action: args[1] }, { $set: permission });
        // } else if(args[0] == 'list') {
        //     let permission: Permission = await bot.permissions.findOne({ action: args[1] });
        //     message.reply(permission.user_ids.map(
        //         (id: string): string => bot.client.users.get(id).tag).join(', ')
        //     );
        // }

        if(args[0] == 'action') {
            if(!args[1]) message.reply('klops');
            if(args[2] && args[2] == 'create')
                bot.permissions.insertOne({ action: args[1], user_ids: [] });
            else if(args[2] && args[2] == 'delete')
                bot.permissions.deleteOne({ action: args[1] });
            else if(args[2] == 'removeuser') {
                let permission: Permission = await bot.permissions.findOne({ action: args[1] });
                permission.user_ids.splice(permission.user_ids.indexOf(args[2]), 1);
                bot.permissions.updateOne({ action: args[1] }, { $set: permission });
            }
            else if(args[2] && args[2].toLowerCase() == 'adduser') {
                if(!args[3] || !args[3].match(/<@[0-9]{18}>/))
                    message.reply('mention somebody, dont be shy');
                let action: Permission = await bot.permissions.findOne({ action: args[1], user_ids: [] });
                action.user_ids.push(args[3].substring(2, 20));
                bot.permissions.updateOne({ action: args[1] }, action);
            }
            else {
                let action: Permission = await bot.permissions.findOne({ action: args[1], user_ids: [] });
                if(!action) message.reply('action doesn\'t exist');
                message.channel.send(new RichEmbed()
                    .setTitle(`Action: ${args[1]}`)
                    .setDescription(`Users: ${action.user_ids.map((v: string): string => bot.client.users.get(v).toString()).join('\n')}`)
                    .setThumbnail(bot.client.user.avatarURL));
            }
        }
    }
}
