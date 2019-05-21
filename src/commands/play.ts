import Command from '../interfaces/command';
import { Message, VoiceConnection } from 'discord.js';
import * as ytdl from 'ytdl-core';
import bot from '..';

export default class PlayCommand implements Command {
    info = {
        names: ['play'],
        description: 'Plays music',
        usage: '&play (link)'
    }

    play(vc: VoiceConnection, message: Message): void {
        bot.music[message.guild.id].dispatcher = vc.playStream(
            ytdl(bot.music[message.guild.id].queue.shift(), { filter: 'audioonly' })
        );

        bot.music[message.guild.id].dispatcher.on('end', (): void => {
            if(bot.music[message.guild.id].queue[0])
                this.play(vc, message);
            else vc.disconnect();
        });
    }

    run(message: Message, args: string[], messages: any): any {
        if(!args[0])
            return message.reply(messages.specifyURL);
        
        if(!message.member.voiceChannel)
            return message.reply(messages.connectVoice);

        if(!bot.music[message.guild.id])
            bot.music[message.guild.id] = {
                queue: []
            };
        
        bot.music[message.guild.id].queue.push(args[0]);

        if(!message.guild.voiceConnection)
            message.member.voiceChannel.join().then((vc: VoiceConnection): void => {
                this.play(vc, message);
            });
    }
}