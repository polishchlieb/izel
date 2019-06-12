import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';

export default class SkipCommand implements Command {
    info = {
        names: ['skip', 's'],
        description: 'Skips current song',
        usage: '&skip',
        category: 'music'
    }

    run(message: Message, _args: string[], messages: any): any {
        // TODO: ileś % słuchaczy musi wyrazić zgodę na skipa
        if(!message.member.voiceChannel)
            message.reply(messages.connectVoice);

        let player = bot.player.manager.get(message.guild.id);
        if(player) {
            player.stop();
            message.reply(messages.skipped);
        } if (!player) {
            message.reply(messages.notPlaying)
        }
    }
}
