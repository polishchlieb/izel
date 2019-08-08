import Command from '../interfaces/command';
import { Message, MessageCollector, RichEmbed, Role } from 'discord.js';
import Messages from '../interfaces/messages';
import bot from '..';

export default class ClickroleCommand implements Command {
    info = {
        names: ['clickrole'],
        description: 'Creates a clickrole message',
        usage: '&clickrole',
        category: 'tool'
    };

    run(message: Message, []: string[], messages: Messages): void {
        message.channel.send(messages.clickRoleStart);

        const collector: MessageCollector = message.channel.createMessageCollector(
            (m: Message): boolean => m.author.id == message.author.id,
            { time: 900000 }
        );
        let roles: [string, string][];

        collector.on('collect', (m: Message): any => {
            if(m.content == 'papryka')
                return collector.stop();

            let [ emoji, ...rn ]: string[] = m.content.split(' ');
            if(!emoji || !rn.length)
                return message.channel.send(messages.usePapryka);

            let rolename: string = rn.join(' ');
            let role: Role = message.guild.roles.find(
                (r: Role): boolean => r.name == rolename
            );

            if(emoji.length == 2)
                roles.push([emoji, role.id]), message.react('✅');
            else if(/<:\w{2,}:\d{14,}>/.test(emoji)) {
                let id: string = emoji.match(/(?<=<:\w{2,}:)(\d{14,})(?=>)/)[0];
                if(!bot.client.emojis.get(id))
                    return message.channel.send(messages.noSuchEmoji);

                roles.push([id, role.id]);
                message.react('✅');
            }
            else return message.channel.send(messages.noSuchEmoji);
        });
        
        collector.on('end', (): any => {
            if(roles.length == 0)
                return message.channel.send(messages.cancelled);

            message.channel.send(new RichEmbed()
                .setTitle(messages.reactForRole)
                .setDescription(
                    roles.map((v: [string, string]) => `${v[0]} ${v[1]}`).join('\n')
                ))
                .then((m: Message): void => {
                    roles.forEach(([ e ]: [string, string]): void => {
                        if(e.length == 2) m.react(e);
                        else m.react(bot.client.emojis.get(e));
                    });

                    bot.clickRole.insertOne({
                        message: m.id,
                        roles
                    });
                });
        });
    }
}