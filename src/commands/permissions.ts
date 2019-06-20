import { Message, RichEmbed, User } from 'discord.js';
import Command from '../interfaces/command';
import { Permission } from '../interfaces/databaseStructures';
import bot from '..';
import Messages from '../interfaces/messages';
const { developerMode } = require('../../config.json');

export default class MathCommand implements Command {
    info = {
        names: ['permissions'],
        description: 'only for the izel\'s government',
        usage: '&permissions (...)',
        category: 'developer'
    };

    async run(message: Message, args: string[], messages: Messages): Promise<any> {
        if(!developerMode) return;
        
        if(message.author.id != '372459063339909120')
            return message.reply(messages.noPermission);

        if(args[0] == 'action') {
            if(!args[1] || !args[2])
                message.reply('klops');
            if(args[2] == 'create')
                if(!bot.permissions.findOne({ action: args[1] }))
                    bot.permissions.insertOne({ action: args[1], user_ids: [] })
                        .then((): void => {
                            message.react('✅');
                        });
                else message.reply(messages.permExists);
            else if(args[2] == 'delete')
                bot.permissions.deleteOne({ action: args[1] })
                    .then((): void => {
                        message.react('✅');
                    });
            else if(args[2] == 'removeuser') {
                let permission: Permission = await bot.permissions.findOne({ action: args[1] });
                permission.user_ids.splice(permission.user_ids.indexOf(args[2]), 1);
                bot.permissions.updateOne({ action: args[1] }, { $set: permission })
                    .then((): void => {
                        message.react('✅');
                    });
            }
            else if(args[2].toLowerCase() == 'adduser') {
                if(!args[3] || !args[3].match(/<@[0-9]{18}>/))
                    message.reply(messages.mentionSomebody);
                let action: Permission = await bot.permissions.findOne({ action: args[1] });
                action.user_ids.push(args[3].substring(2, 20));
                bot.permissions.updateOne({ action: args[1] }, { $set: action })
                    .then((): void => {
                        message.react('✅');
                    });
            }
            else {
                let action: Permission = await bot.permissions.findOne({ action: args[1] });
                if(!action) message.reply('action doesn\'t exist');
                message.channel.send(new RichEmbed()
                    .setTitle(`Action: ${args[1]}`)
                    .setDescription(`Users: ${action.user_ids.map((v: string): string => bot.client.users.get(v).toString()).join('\n')}`)
                    .setThumbnail(bot.client.user.avatarURL)
                    .setFooter(`${messages.requestedBy} ${message.member.displayName}`, message.author.avatarURL));
            }
        } else if(args[0] == 'user') {
            if(!message.mentions.members.first())
                message.reply(messages.mentionSomebody);

            let user: User = message.mentions.members.first().user;
            message.channel.send(new RichEmbed()
                .setTitle(`User: ${user.username}`)
                .setDescription(
                    (await bot.permissions.find().toArray())
                        .filter((p: Permission): boolean =>
                            p.user_ids.includes(user.id)
                        ).map((p: Permission): string => p.action)
                         .join('\n')
                )
                .setThumbnail(user.avatarURL)
                .setColor('RED')
                .setFooter(`${messages.requestedBy} ${message.member.displayName}`, message.author.avatarURL));
        }
    }
}
