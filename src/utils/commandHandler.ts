import { Message } from 'discord.js';
import { bot } from '..';
import { Command } from '../interfaces/command';
const { prefix }: { prefix: string } = require('../../config.json');

export const handleCommand = (message: Message): void => {
    const args = message.content
        .substring(prefix.length)
        .split(' ');
    const name: string = args.shift().toLowerCase();
    const command: Command = bot.commands.find((c: Command) => c.info.names.includes(name));

    if(command)
        command.run(message, args);
    else
        message.react('❓');
}