import { Message } from 'discord.js';
import { bot } from '..';
const { prefix }: { prefix: string } = require('../../config.json');

export const handleCommand = (message: Message): void => {
    const args = message.content
        .substring(prefix.length)
        .split(' '),
    name = args.shift().toLowerCase(),
    command = bot.commands.find(c => 
        c.info.names.includes(name)
    );

    if(command)
        command.run(message, args);
    else message.react('❓');
}