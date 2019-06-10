import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';
import { MusicServer } from '../interfaces/music';

export default class StopCommand implements Command {
    info = {
        names: ['stop', 'leave'],
        description: 'Stops playing',
        usage: '&stop',
        category: 'music'
    }

    run(message: Message, _args: string[], messages: any): any {
        if(!message.member.voiceChannel)
            return message.reply(messages.connectVoice);

        let server: MusicServer = bot.music[message.guild.id];
        if(server.dispatcher) {
            message.member.voiceChannel.leave();
            delete bot.music[message.guild.id];
            message.reply(messages.stopped);
        } else message.reply(messages.notPlaying);
    }
}
