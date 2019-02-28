import { Event } from '../interfaces/event';
import { Message } from 'discord.js';
import { bot } from '..';
import { Command } from '../interfaces/command';

const { prefix }: { prefix: string } = require('../../config.json');

export class MessageEvent implements Event {
    name = 'message';

    run(message: Message) {
        handleCommand(message);
    }
}

function handleCommand(message: Message) {
    if(!message.content.startsWith(prefix)
       || message.author.bot
       || !message.guild)
        return;

    const args: string[] = message.content
        .substring(prefix.length)
        .split(' '),
    name: string = args.shift(),
    command: Command = bot.commands.find(c => c.info.names.includes(name.toLowerCase()));

    if(command)
        command.run(bot.client, message, args);
    else message.react('❓');
}