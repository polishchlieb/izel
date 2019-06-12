import Command from "../interfaces/command";
import { Message, RichEmbed } from "discord.js";
import PlayCommand from "./play";
const { radios } = require('../../radios.json')

export default class RadioCommand implements Command {
    info = {
        names: ['radio'],
        description: 'Select or list available radios',
        usage: '&radio',
        category: 'music'
    }

    run(message: Message, args: string[], messages: any): void | Promise<Message|Message[]> {
        const query = args.join(" ").toLowerCase();
        if(query) { // no to szukamy radyja
            let result = radios.find(r => r.title.toLowerCase() == query);
            if(result) {
                new PlayCommand().run(message, [result.stream], messages);
            } else {
                return message.reply(messages.noResults);
            }
        } else {
            message.channel.send(new RichEmbed()
                .setTitle('Radio')
                .setColor('RANDOM')
                .setDescription(messages.radioDescription +'\nhttp://izel.chlebe.tk/radios')
                .setURL('http://izel.chlebe.tk/radios')
                .setFooter(`${messages.requestedBy} ${message.member.displayName}`, message.author.avatarURL));
        }
    }
}