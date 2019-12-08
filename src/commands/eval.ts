import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import bot from '..';
import { Permission } from '../interfaces/databaseStructures';
import Messages from '../interfaces/messages';
const { developerMode } = require('../../config.json');

export default class EvalCommand implements Command {
    info = {
        names: ['eval'],
        description: 'it shouldn\'t be here',
        usage: '&eval (code)',
        category: 'developer'
    };

    scope: any = {};

    async run(message: Message, [ flag, ...expr ]: string[], { use }: Messages): Promise<any> {
        if (!developerMode) return;

        if (!flag && expr.length == 0)
            return message.reply(`${use} \`${this.info.usage}\``);

        if (flag != 'silent') expr.unshift(flag);

        let value: any;
        try {
            value = eval(expr.join(' '));
        } catch(e) {
            if(flag != 'silent')
                message.channel.send(new RichEmbed()
                    .setTitle('Evaluation Failed')
                    .addField('Error', e.message)
                    .setColor('RED'));
        } finally {
            if(flag != 'silent' && typeof value != 'undefined')
                message.channel.send(new RichEmbed()
                    .setTitle('Evaluated')
                    .addField('Value', value)
                    .setColor('GREEN'));
        }
    }
}
