import { Message } from 'discord.js';
import bot from '..';
import Command from '../interfaces/command';
const { prefix }: { prefix: string } = require('../../config.json');

const handleCommand = (message: Message, messages: any): void => {
    const args: string[] = message.content
        .substring(prefix.length)
        .split(' ');
    const name: string = args.shift().toLowerCase();
    const command: Command = bot.commands.find((c: Command) => c.info.names.includes(name));

    if(command)
        command.run(message, args, messages);
    else message.react('❓');
}

export default handleCommand;