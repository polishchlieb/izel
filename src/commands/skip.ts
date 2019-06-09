import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';
import { MusicServer } from '../interfaces/music';

export default class SkipCommand implements Command {
    info = {
        names: ['skip'],
        description: 'Skips current song',
        usage: '&skip'
    }

    run(message: Message, _args: string[], messages: any): any {
        if(!message.member.voiceChannel)
            message.reply(messages.connectVoice);

        let server: MusicServer = bot.music[message.guild.id];
        if(server.dispatcher) {
            server.dispatcher.end();
            message.reply(messages.skipped);
        } else message.reply(messages.notPlaying);
    }
}
