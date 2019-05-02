import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';

export default class EvalCommand implements Command {
    info = {
        names: ['eval'],
        description: 'tylko dla rzadu',
        usage: 'eval (code)'
    }

    run(message: Message, args: string[]): void | Promise<Message | Message[]> {
        if(message.author.id != '372459063339909120')
            return message.reply('masz cos lepszego do roboty');

        let val: any;

        try {
            val = eval(args.join(' '));
        } catch(e) {
            message.channel.send(new RichEmbed()
                .setTitle('Evaluation Failed')
                .addField('Error', e.message)
                .setColor('RED'));
        } finally {
            if(typeof val != 'undefined')
                message.channel.send(new RichEmbed()
                    .setTitle('Evaluated')
                    .addField('Value', val)
                    .setColor('GREEN'));
        }
    }
}