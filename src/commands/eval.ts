import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import _bot from '..';

export default class EvalCommand implements Command {
    info = {
        names: ['eval'],
        description: 'tylko dla rzadu',
        usage: 'eval (code)'
    }

    set: any = {};

    async run(message: Message, args: string[]): Promise<any> {
        let permissions: any = await _bot.permissions.findOne({
            action: 'eval'
        });

        if(!permissions.user_ids.includes(message.author.id))
            return message.reply('masz cos lepszego do roboty');

        let value: any;

        try {
            value = eval(args.join(' '));
        } catch(e) {
            message.channel.send(new RichEmbed()
                .setTitle('Evaluation Failed')
                .addField('Error', e.message)
                .setColor('RED'));
        } finally {
            if(typeof value != 'undefined')
                message.channel.send(new RichEmbed()
                    .setTitle('Evaluated')
                    .addField('Value', value)
                    .setColor('GREEN'));
        }
    }
}