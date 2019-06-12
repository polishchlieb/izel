import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';

export default class StopCommand implements Command {
    info = {
        names: ['leave', 'stop'],
        description: 'Stops playing',
        usage: '&stop',
        category: 'music'
    }

    run(message: Message, _args: string[], messages: any): any {
        if (!message.member.voiceChannel)
            message.reply(messages.connectVoice);

        let player = bot.player.manager.get(message.guild.id);
        if (player) {
            bot.player.manager.leave(message.guild.id);
            delete bot.player.queue[message.guild.id];
            delete bot.player.playing[message.guild.id];
            message.reply(messages.stopped);
        } if (!player) {
            message.reply(messages.notPlaying)
        }
    }
}
