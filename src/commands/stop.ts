import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';
import Messages from '../interfaces/messages';
import { Player } from 'discord.js-lavalink';

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
            bot.player.manager.leave(message.guild.id);
            delete bot.player.queue[message.guild.id];
            delete bot.player.playing[message.guild.id];
            message.reply(messages.stopped);
        } else {
            message.reply(messages.notPlaying)
        }
    }
}
