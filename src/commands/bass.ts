import Command from '../interfaces/command';
import { Message, Role } from 'discord.js';
import Messages from '../interfaces/messages';
import bot from '..';
import { Player } from 'discord.js-lavalink';

export default class BassCommand implements Command {
    info = {
        names: ['bass'],
        description: 'toggles bass boost',
        usage: 'bass',
        category: 'music (DJ)'
    };

    run(message: Message, []: string[], messages: Messages) {
        const player: Player = bot.player.manager.get(message.guild.id);
        
        if(!player)
            return message.reply(messages.notPlaying)

        let mode: boolean = bot.player.settings[message.guild.id].bass;
        if(message.member.voiceChannel.id == player.channel) {
            if(message.member.roles.find((r: Role): boolean => r.name == 'DJ')
               || message.member.hasPermission('ADMINISTRATOR')) {
                if(!mode) {
                    setTimeout(() => player.volume(600), 3000);
                    message.channel.send("headphone warning ok")
                    bot.player.settings[message.guild.id].bass = true;
                    message.react('🔊');
                } else {
                    player.volume(200);
                    bot.player.settings[message.guild.id].bass = false;
                    message.react('🔇');
                }
            } else
                return message.reply(messages.djRole);
        } else
            message.reply(messages.connectVoice);
    }
}