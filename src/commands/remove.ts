import Command from '../interfaces/command';
import { Message, Role } from 'discord.js';
import Messages from '../interfaces/messages';
import { Player } from 'discord.js-lavalink';
import bot from '..';
import { QueueTrack } from '../interfaces/player';

export default class RemoveCommand implements Command {
    info = {
        names: ['remove', 'rm'],
        description: 'Adds a song to the top of queue',
        usage: 'remove (number)',
        category: 'music (DJ)'
    };

    run(message: Message, args: string[], messages: Messages): any {
        const player: Player = bot.player.manager.get(message.guild.id);
        const queue: QueueTrack[] = bot.player.queue[message.guild.id];

        if(message.member.roles.find((r: Role): boolean => r.name == 'DJ')
           || message.member.hasPermission('ADMINISTRATOR')) {
            if (!player)
                return message.reply(messages.nothingPlaying);

            const toRemove: number = Number(args[0]);
            if (!toRemove)
                return message.reply(`${messages.use} ${this.info.usage}`)

            if (queue[toRemove - 1]) {
                queue.splice(toRemove - 1, 1);
                message.reply(messages.removed.replace('{}', toRemove.toString()));
            } else
                return message.reply(messages.noSuchNumber);
        } else
            return message.reply(messages.djRole);
    }
}