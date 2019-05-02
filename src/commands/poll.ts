import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';

export default class PollCommand implements Command {
    info = {
        names: ['poll'],
        description: '',
        usage: 'poll (whatever..)'
    }

    run(message: Message, args: string[], messages: any): void | Promise<Message | Message[]> {
        if(args.length == 0)
            return message.reply(`use: \`${this.info.usage}\``);
        
        message.channel.send(new RichEmbed()
            .setTitle(messages.poll)
            .setColor('RANDOM')
            .setDescription(args.join(' ')));
    }
}