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
        if(!message.member.hasPermission('MANAGE_ROLES') && !message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(messages.noPermission);

        message.channel.send(messages.clickRoleStart);

        const collector: MessageCollector = message.channel.createMessageCollector(
            (m: Message): boolean => m.author.id == message.author.id,
            { time: 900000 }
        );

        let roles: any[] = [];
        let db_roles: { [k: string]: string } = {};

        collector.on('collect', (m: Message): any => {
            if(m.content == 'papryka')
                return collector.stop();

            let [ emoji, ...rn ]: string[] = m.content.split(' ');
            if(!emoji || !rn.length)
                return message.channel.send(messages.usePapryka);

            let rolename: string = rn.join(' ');
            let role: Role = message.guild.roles.find(
                (r: Role): boolean => r.name.toLowerCase() == rolename.toLowerCase()
            );

            if(!role)
                return message.channel.send(messages.noSuchRole);

            // if(!message.guild.members.get(bot.client.user.id).hasPermission('MANAGE_ROLES') 
            //    || role.position >= message.guild.members.get(bot.client.user.id).highestRole.position) {
            //     message.channel.send(`❗ ${messages.itMayNotWork}`);

            if(emoji.length == 2 && twemoji.test(emoji)) {
                roles.push({ emoji, role: role.name });
                db_roles[emoji] = role.id; 

                m.react('✅');
            } else {
                let e: Emoji = message.guild.emojis.find((e: Emoji): boolean => e.name == emoji);
                if(!e) return m.react('❌');

                roles.push({ emoji: e.toString(), role: role.name });
                db_roles[e.id] = role.id;

                m.react('✅');
            }
        });
        
        collector.on('end', (): any => {
            if(roles.length == 0)
                return message.channel.send(messages.cancelled);

            message.channel.send(new RichEmbed()
                .setTitle(messages.reactForRole)
                .setColor('RANDOM')
                .setDescription(
                    roles.map((v): string => `${v.emoji} ${v.role}`).join('\n')
                ))

                .then((m: Message): void => {
                    bot.clickRole.insertOne({
                        message: m.id,
                        roles: db_roles
                    });
                });
        });
    }
}