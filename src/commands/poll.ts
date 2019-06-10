import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';

export default class PollCommand implements Command {
    info = {
        names: ['poll'],
        description: 'don\'t confuse with pollution, izel is a nature-friendly robot',
        usage: '&poll (topic..)'
    }

    run(message: Message, args: string[], messages: any): any {
        if(args.length == 0)
            return message.reply(`${messages.use}: \`${this.info.usage}\``);
        
        message.channel.send(new RichEmbed()
            .setTitle(messages.poll)
            .setColor('RANDOM')
            .setDescription(args.join(' ')))
            .then((message: Message): void => {
                message.react('🤷');
                message.react('👍');
                message.react('👎');
            });
    }
}