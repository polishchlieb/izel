import { Message } from 'discord.js';
import { Command } from '../interfaces/command';
import { Event } from '../interfaces/event';
import { bot } from '..';

const { prefix }: { prefix: string } = require('../../config.json');

export class MessageEvent implements Event {
    name = 'message';

    run(message: Message) {
        if(!message.content.startsWith(prefix)
           || message.author.bot
           || !message.guild) return;

        const args: string[] = message.content
            .substring(prefix.length)
            .split(' '),
        name: string = args.shift().toLowerCase(),
        command: Command = bot.commands.find(c => 
            c.info.names.includes(name)
        );

        if(command)
            command.run(bot.client, message, args);
        else message.react('❓');
    }
}