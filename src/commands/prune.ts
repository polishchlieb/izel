import Command from '../interfaces/command';
import { Message, Collection } from 'discord.js';
import Messages from '../interfaces/messages';

export default class PruneCommand implements Command {
    info = {
        names: ['prune'],
        description: 'Removes messages',
        usage: '&prune (count)',
        category: 'admin'
    };

    run(message: Message, args: string[], messages: Messages): any {
        if(!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.reply(messages.noPermission);
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES'))
            return message.reply(messages.noBotPermission);

        let count: number = parseInt(args[0]);
        if(isNaN(count))
            return message.reply(`${messages.use} \`${this.info.usage}\``);

        message.channel.bulkDelete(count + 1)
            .then((msgs: Collection<string, Message>): void => {
                message.reply(
                    messages.deletedMessages.replace('{}', (msgs.size - 1).toString())
                );
            });
    }
}