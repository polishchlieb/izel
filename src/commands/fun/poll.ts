import { Command } from '../../interfaces/command';
import { Client, Message, RichEmbed } from 'discord.js';

export class PollCommand implements Command {
    info = {
        names: ['poll'],
        description: 'Calls a poll',
        usage: 'poll (topic..)'
    }

    async run(bot: Client, message: Message, args: string[]) {
        if(args.length == 0)
            return message.reply(`use: \`${this.info.usage}\``);

        const m = await message.channel.send(new RichEmbed()
            .setTitle('Poll')
            .setDescription(args.join(' '))
            .setColor('RANDOM'));

        if(!(m instanceof Message)) return;

        m.react('👍');
        m.react('👎');
        m.react('🤷');
    }
}