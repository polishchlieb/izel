import { Message, Role } from 'discord.js';
import { Player } from 'discord.js-lavalink';

import bot from '..';
import Command from '../interfaces/command';
import Messages from '../interfaces/messages';

export default class StopCommand implements Command {
    info = {
        names: ['leave', 'stop'],
        description: 'Stops playing',
        usage: '&stop',
        category: 'music'
    };

    run(message: Message, []: string[], messages: Messages): any {
        if(!message.member.voiceChannel)
            return message.reply(messages.connectVoice);
        
        let player: Player = bot.player.manager.get(message.guild.id);
        if(player) {
            if(message.member.roles.find((r: Role): boolean => r.name == 'DJ')
               || message.member.hasPermission('ADMINISTRATOR')) {
                bot.player.manager.leave(message.guild.id);
                delete bot.player.queue[message.guild.id];
                delete bot.player.playing[message.guild.id];
                message.react('✅');
            } else message.reply(messages.djRole);
        } else
            message.reply(messages.notPlaying);
    }
}
