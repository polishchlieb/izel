import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import fetch, { Response } from 'node-fetch';
import Messages from '../interfaces/messages';

export default class MinecraftCommand implements Command {
    info = {
        names: ['minecraft', 'mc'],
        description: 'meinkampf server info',
        usage: '&minecraft (server ip)',
        category: 'tool'
    };

    run(message: Message, args: string[], messages: Messages): any {
        if(args.length != 1)
            return message.reply(`${messages.use} \`${this.info.usage}\``);

        message.channel.startTyping();
        fetch(`http://mcapi.us/server/query?ip=${args[0]}`)
            .then((res: Response): Promise<any> => res.json())
            .then((data: any): void => {
                if(!data.online)
                    message.channel.send(new RichEmbed()
                        .setTitle(args[0])
                        .setDescription(messages.serverOffline));

                else message.channel.send(new RichEmbed()
                    .setTitle(args[0])
                    .addField(messages.players, `${data.players.now}/${data.players.max}`, true)
                    .addField('MOTD', data.motd, true)
                    .addField(messages.version, data.version)
                    .setColor('RANDOM')
                    .setFooter(`${messages.requestedBy} ${message.member.displayName}`, message.author.avatarURL)
                );

                message.channel.stopTyping();
            });
    }
}