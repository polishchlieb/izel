import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import _bot from '..';

export default class EvalCommand implements Command {
    info = {
        names: ['eval'],
        description: 'tylko dla rzadu',
        usage: 'eval (code)'
    }

    async run(message: Message, args: string[]): Promise<any> {
        let permissions = await _bot.database.collection('permissions').findOne({
            action: 'eval'
        });

        if(!permissions.user_ids.includes(message.author.id))
            return message.reply('masz cos lepszego do roboty');

        let val: any;

        const set: any = {};

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