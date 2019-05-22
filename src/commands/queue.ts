import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import bot from '..';

export default class QueueCommand implements Command {
    info = {
        names: ['queue', 'q'],
        description: 'Shows the queue',
        usage: '&queue'
    }

    run(message: Message, args: string[], messages: any): void {
        let server: any = bot.music[message.guild.id];
        if(server)
            message.channel.send(
                new RichEmbed()
                    .setTitle(messages.queue)
                    .setDescription(server.queue.join('\n'))
            );
    }
}
