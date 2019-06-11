import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import bot from '..';
import { Player } from 'discord.js-lavalink';
import { QueueTrack } from '../interfaces/player';

export default class QueueCommand implements Command {
    info = {
        names: ['queue', 'q'],
        description: 'Shows the queue',
        usage: '&queue',
        category: 'music'
    }

    run(message: Message, _args: string[], messages: any): void {
        const player: Player = bot.player.manager.get(message.guild.id);
        const queue = bot.player.queue[message.guild.id];
        const playing = bot.player.playing[message.guild.id];
        if (player) {
            message.channel.send(
                new RichEmbed()
                .setTitle(messages.queue)
                .setDescription(
                    `
__${messages.nowPlaying}:__
${playing.title} | \`${messages.queryRequested} ${playing.requester}\`

${queue
    .map((v: QueueTrack, i: number): string => `${i + 1}. ${v.title} | \`${messages.queryRequested} ${v.requester}\``)
    .join('\n')}
`
                )
                .setFooter(`${messages.requestedBy} ${message.member.displayName}`, message.author.avatarURL)
                .setColor('RANDOM')
            );
        }
    }
}