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

    }

    run(message: Message, _args: string[], messages: any): any {
        if(message.author.id != '372459063339909120')
            return message.reply(messages.noPermission);
    
        if(!bot.music[message.guild.id])
            bot.music[message.guild.id] = {
                queue: [],
                connection: null
            };

        if(!message.guild.voiceConnection)
            message.member.voiceChannel.join().then((vc: VoiceConnection): void => {
                this.play(vc, message);
            });
    }
}