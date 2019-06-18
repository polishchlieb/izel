import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import Messages from '../interfaces/messages';

export default class PollCommand implements Command {
    info = {
        names: ['poll'],
        description: 'don\'t confuse with pollution, izel is a nature-friendly bot',
        usage: '&poll (topic..)',
        category: 'tool'
    };

    run(message: Message, args: string[], { use, poll }: Messages): any {
        if(args.length == 0)
            return message.reply(`${use}: \`${this.info.usage}\``);
        
        message.channel.send(new RichEmbed()
            .setTitle(poll)
            .setColor('RANDOM')
            .setDescription(args.join(' ')))
            .then((message: Message): void => {
                message.react('🤷');
                message.react('👍');
                message.react('👎');
            });
    }
}