import { Command } from '../../interfaces/command';
import { Client, Message } from 'discord.js';
import { bot as client } from '../..';

export class GreetingCommand implements Command {
    info = {
        names: ['greeting', 'greet'],
        description: 'Sends specified automatically when an user joins the server',
        usage: 'greeting (dm / channel name) (text..)'
    }

    run(bot: Client, message: Message, args: string[]) {
        if(!client.guildData[message.guild.id])
            client.setGuildData(message.guild.id, {});

        if(args.length < 2
           || (args[0] != 'dm' && !message.guild.channels.get(args[0]) && message.guild.channels.get(args[0]).type != 'text'))
            return message.reply(`use: \`${this.info.usage}\``);

        client.guildData[message.guild.id].greeting = [args.shift(), args.join(' ')];
        client.save();
    }
}