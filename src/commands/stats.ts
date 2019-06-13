import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import { hostname, platform, uptime, cpus, CpuInfo } from 'os';
import Messages from '../interfaces/messages';

export default class StatsCommand implements Command {
    info = {
        names: ['stats'],
        description: 'Displays bot stats (especially for nerds)',
        usage: '&stats',
        category: 'stats'
    };

    run(message: Message, []: string[], { requestedBy }: Messages): void {
        message.channel.send(new RichEmbed()
            .setTitle('Stats')
            .setColor('RANDOM')
            .setFooter(`${requestedBy} ${message.member.displayName}`, message.author.avatarURL)
            .addField('Hostname', hostname(), true)
            .addField('Platform', platform(), true)
            .addField('Uptime', Math.floor(uptime() / 3600) + 'h', true)
            .addField('CPUs', cpus().map((c: CpuInfo): string => c.model).join('\n'), false)
        );
    }
}