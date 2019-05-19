import Command from '../interfaces/command';
import { Message, VoiceConnection } from 'discord.js';
import * as ytdl from 'ytdl-core';
import bot from '..';

export default class JoinCommand implements Command {
    info = {
        names: ['join'],
        description: 'rowniez tylko dla rzadu',
        usage: '&join'
    }

    run(message: Message, _args: string[], messages: any): any {
        if(message.author.id != '372459063339909120')
            return message.reply(messages.noPermission);
    
        message.member.voiceChannel.join().then((vc: VoiceConnection): void => {
            if(!bot.music[])
        });
    }
}