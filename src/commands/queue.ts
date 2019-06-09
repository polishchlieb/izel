import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import bot from '..';
import { QueueElement, MusicServer } from '../interfaces/music';

export default class QueueCommand implements Command {
    info = {
        names: ['queue', 'q'],
        description: 'Shows the queue',
        usage: '&queue'
    }

    run(message: Message, _args: string[], messages: any): void {
        let server: MusicServer = bot.music[message.guild.id];
        if(server) {
            let { title, requester }: QueueElement = server.playing;
            message.channel.send(
                new RichEmbed()
                    .setTitle(messages.queue)
                    .setDescription(
`
__${messages.nowPlaying}:__
${title} | \`${messages.queryRequested} ${requester}\`

${server.queue
    .map((v: QueueElement, i: number): string => `${i + 1}. ${v.title} | \`${messages.queryRequested} ${v.requester}\``)
    .join('\n')}
`
                    )
                    .setFooter(`${messages.requestedBy} ${message.member.displayName}`, message.author.avatarURL)
                    .setColor('RANDOM')
            );
        }
    }
}
