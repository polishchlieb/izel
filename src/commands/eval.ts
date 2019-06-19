import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import bot from '..';
import { Permission } from '../interfaces/databaseStructures';
import Messages from '../interfaces/messages';
const { developerMode } = require('../../config.json');

export default class EvalCommand implements Command {
    info = {
        names: ['eval'],
        description: 'tylko dla rzadu',
        usage: '&eval (code)',
        category: 'developer'
    };

    scope: any = {};

    async run(message: Message, [ flag, ...expr ]: string[], { use }: Messages): Promise<any> {
        if(!developerMode) return;
        
        let permissions: Permission = await bot.permissions.findOne({
            action: 'eval'
        });
        if(!permissions)
            return message.reply('ERROR 404: BRAIN NOT FOUND');
        if(!permissions.user_ids.includes(message.author.id))
            return message.reply('masz cos lepszego do roboty');

        if(!flag && expr.length == 0)
            return message.reply(`${use} \`${this.info.usage}\``);

        if(flag != 'silent')
            expr.unshift(flag);

        let value: any;
        try {
            value = eval(expr.join(' '));
        } catch(e) {
            if(flag != 'silent')
                message.channel.send(new RichEmbed()
                    .setTitle('Evaluation Failed')
                    .addField('Error', e.message)
                    .setColor('RED'))
                    .then((msg: Message): void => {
                        setTimeout((): any => msg.delete(), 5000);
                    });
        } finally {
            if(flag != 'silent')
                if(typeof value != 'undefined')
                    message.channel.send(new RichEmbed()
                        .setTitle('Evaluated')
                        .addField('Value', value)
                        .setColor('GREEN'))
                        .then((msg: Message): void => {
                            setTimeout((): any => msg.delete(), 5000);
                        });
        }
    }
}
