import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import Messages from '../interfaces/messages';

export default class SayCommand implements Command {
    info = {
        names: ['embed'],
        description: 'embed something boi',
        usage: '&embed (description..)',
        category: 'admin'
    };

    async run(message: Message, args: string[], { noPermission }: Messages): Promise<any> {
        // let permissions: Permission = await bot.permissions.findOne({ action: 'say' });
        // if(!permissions.user_ids.includes(message.author.id))
        //     return message.reply(noPermission);
        if(!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.reply(noPermission);

        message.channel.send(new RichEmbed()
            .setColor('GREEN')
            .setDescription(args.join(' ')));
        message.delete();
    }
}
