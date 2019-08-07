import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import bot from '..';
import { Player } from 'discord.js-lavalink';
import { QueueTrack } from '../interfaces/player';
import Messages from '../interfaces/messages';

export default class PlayingCommand implements Command {
    info = {
        names: ['np', 'playing', 'nowplaying'],
        description: 'Shows currently playing song',
        usage: '&np',
        category: 'music'
    };

    run(message: Message, _args: string[], messages: Messages): any {
        const player: Player = bot.player.manager.get(message.guild.id);
        const playing: QueueTrack = bot.player.playing[message.guild.id];

        if(!player)
            return message.reply(messages.nothingPlaying);
        else {
            let now: string = this.calculate(Date.now()-playing.started);
            let len: string = this.calculate(playing.length);

            let respEmbed: RichEmbed = new RichEmbed()
                .setAuthor(messages.nowPlaying, message.author.avatarURL)
                .setColor('#0977b6')
                .setThumbnail(playing.thumbnail)
                .setTitle(playing.title)
                .setURL(playing.uri)
                .addField(messages.queryRequested, playing.requester, true)
            if(!playing.stream) {
                respEmbed.addField(messages.playingTime, `${now}/${len}`, true)
            } else {
                respEmbed.addField(messages.playingTime, `${now}/idk`, true);
            }
            if(playing.channel)
                respEmbed.addField(messages.videoChannel, playing.channel, true);
            message.channel.send(respEmbed);
        }
    }

    calculate(timestamp): string {
        let length: number = Math.floor(timestamp / 1000);

        let hours: number = Math.floor(length / 3600);

        if(hours > 0) {
            let minutes: number = (Math.floor(length / 60)) - 60*hours;
            let seconds: number = length % 60;
            return `${hours}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
        } else {
            let minutes: number = Math.floor(length / 60);
            let seconds: number = length % 60;
            return `${minutes}:${("0" + seconds).slice(-2)}`;
        }
        

        //if (hours > 0) return `${hours}:${minutes}:${("0" + seconds).slice(-2)}`;
        //else 
        
    }
}