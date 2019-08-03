import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import PlayCommand from './play';
import Messages from '../interfaces/messages';
import Radio from '../interfaces/radio';
const { dashboard }: { dashboard: string } = require('../../config.json');

const { radios }: { radios: any[] } = require('../../radios.json')

export default class RadioCommand implements Command {
    info = {
        names: ['radio', 'r'],
        description: 'Select or list available radios',
        usage: '&radio',
        category: 'music'
    };

    run(message: Message, [ ...arg ]: string[], messages: Messages): any {
        if(arg.length == 0)
            return message.channel.send(new RichEmbed()
                .setTitle('Radio')
                .setColor('RANDOM')
                .setDescription(`${messages.radioDescription}\n${dashboard}/radios`)
                .setURL(`${dashboard}/radios`)
                .setFooter(
                    `${messages.requestedBy} ${message.member.displayName}`,
                    message.author.avatarURL
                ));
        
        let query: string = arg.join(' ').toLowerCase();
        let result: Radio = radios.find((r: Radio): boolean => r.title.toLowerCase() == query);
        if(result)
            new PlayCommand().run(message, [result.stream], messages, result.img);
        else return message.reply(messages.noResults);
    }
}