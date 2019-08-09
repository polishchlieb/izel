import Command from '../interfaces/command';
import { Message, MessageCollector, RichEmbed, Role, MessageReaction, CollectorFilter, User, ReactionCollector } from 'discord.js';
import Messages from '../interfaces/messages';
import bot from '..';
import { ClickRoles, ClickRole } from '../interfaces/databaseStructures';

export default class ClickroleCommand implements Command {
    info = {
        names: ['clickrole'],
        description: 'Creates a clickrole message',
        usage: '&clickrole',
        category: 'tool'
    };

    run(message: Message, []: string[], messages: Messages): void {
        if(!message.member.hasPermission('MANAGE_ROLES') && !message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send(messages.noPermission);
            return;
        }

        message.channel.send(messages.clickRoleStart);

        const collector: MessageCollector = message.channel.createMessageCollector(
            (m: Message): boolean => m.author.id == message.author.id,
            { time: 900000 }
        );
        let roles: ClickRoles[] = [];

        collector.on('collect', (m: Message): any => {
            if(m.content == ('papryka' || 'cancel' || 'anuluj'))
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
            else if(emoji == '❌')
                return message.channel.send('wait that\'s illegal');
            else if(emoji.length == 2)
                roles.push({ emoji, id: role.id, name: role.name }), message.react('✅');
            else if(/<:\w{2,}:\d{14,}>/.test(emoji)) {
                let id: string = emoji.match(/(?<=<:\w{2,}:)(\d{14,})(?=>)/)[0];
                if(!bot.client.emojis.get(id))
                    return message.channel.send(messages.noSuchEmoji);

                roles.push({ emoji, id: role.id, name: role.name });
                message.react('✅');
            }
            else return message.channel.send(messages.noSuchEmoji);
        });
        
        collector.on('end', (): any => {
            if(roles.length == 0)
                return message.channel.send(messages.cancelled);

            message.channel.send(new RichEmbed()
                .setTitle(messages.reactForRole)
                .setColor('RANDOM')
                .setDescription(
                    roles.map((v: ClickRoles) => `${v.emoji} ${v.name}`).join('\n')
                ))
                .then((m: Message): void => {
                    roles.forEach(({ emoji }: ClickRoles): void => {
                        if(emoji.length == 2) m.react(emoji);
                        else m.react(bot.client.emojis.get(emoji));
                        m.react('❌')
                    });

                    const clicc = {
                        message: m.id,
                        channel: m.channel.id,
                        roles
                    };

                    bot.clickRole.insertOne(clicc);

                    const filter: CollectorFilter = (r: MessageReaction, user: User) => !user.bot;
                    const reactCollector: ReactionCollector = m.createReactionCollector(filter);
                    reactCollector.on('collect', r => catchReaction(r, m, clicc))
                });
        });
    }
}

export function catchReaction(r: MessageReaction, message: Message, role: ClickRole) {
    if (r.emoji.toString() == '❌') {
        let thatUser = r.users.last();
        let thatReaction = message.reactions.find(r => r.emoji.toString() != '❌');
        // usuwa role
        let test: string = thatReaction.emoji.id || thatReaction.emoji.toString();
        let roleTG: string = role.roles.find(({ emoji }: ClickRoles): boolean => emoji == test).id;
        message.guild.fetchMember(thatUser)
        .then(member => {
            member.removeRole(roleTG);
        })

        // usuwa reackje
        message.reactions.forEach(rr => rr.remove(thatUser));
    } else {
        let test: string = r.emoji.id || r.emoji.toString();
        let roleTG: string = role.roles.find(({ emoji }: ClickRoles): boolean => emoji == test).id;
        message.guild.fetchMember(r.users.last())
        .then(member => {
            member.addRole(roleTG);
        })
    }
}