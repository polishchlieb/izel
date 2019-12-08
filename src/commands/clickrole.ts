import Command from '../interfaces/command';
import { Message, MessageCollector, RichEmbed, Role, Emoji } from 'discord.js';
import Messages from '../interfaces/messages';
import bot from '..';
import * as twemoji from 'twemoji';

export default class ClickroleCommand implements Command {
    info = {
        names: ['clickrole'],
        description: 'Creates a clickrole message',
        usage: '&clickrole',
        category: 'tool'
    };

    run(message: Message, []: string[], messages: Messages): any {
        if (!message.member.hasPermission('MANAGE_ROLES') && !message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(messages.noPermission);

        message.author.send(messages.clickRoleStart);
        message.react('🗨');

        const collector: MessageCollector = message.channel.createMessageCollector(
            (m: Message): boolean => m.author.id == message.author.id,
            { time: 900000 }
        );

        // declare some variables to easily use them
        let roles: any[] = [];
        let db_roles: { [k: string]: string } = {};
        let emojis: string[] = [];

        collector.on('collect', (m: Message): any => {
            setTimeout(() => {
                m.delete();
            }, 1000);

            if(m.content == 'papryka')
                return collector.stop();

            let [ emoji, ...rn ]: string[] = m.content.split(' ');
            if(!emoji || !rn.length)
                return message.author.send(messages.usePapryka);

            let rolename: string = rn.join(' ');
            let role: Role = message.guild.roles.find(
                (r: Role): boolean => r.name.toLowerCase() == rolename.toLowerCase()
            );

            if(!role)
                return message.author.send(messages.noSuchRole);

            if(twemoji.test(emoji)) {
                roles.push({ emoji, role: role.name });
                db_roles[emoji] = role.id;
                emojis.push(emoji);

                m.react('✅');
            } else {
                let e: Emoji = message.guild.emojis.find((e: Emoji): boolean => e.name == emoji);
                if(!e) return m.react('❌');

                roles.push({ emoji: e.toString(), role: role.name });
                db_roles[e.id] = role.id;
                emojis.push(e.id);

                m.react('✅');
            }
        });
        
        collector.on('end', (): any => {
            if (roles.length == 0)
                return message.author.send(messages.cancelled);

            message.channel.send(new RichEmbed()
                .setTitle(messages.reactForRole)
                .setColor('RANDOM')
                .setDescription(
                    roles.map((v): string => `${v.emoji} ${v.role}`).join('\n')
                ))
                .then((m: Message): void => {
                    emojis.forEach((emoji: string): void => {
                        m.react(emoji);
                    });

                    bot.clickrole.insertOne({
                        message: m.id,
                        roles: db_roles
                    });
                });
        });
    }
}