import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import bot from '..';
import { Player } from 'discord.js-lavalink';

export default class PlayingCommand implements Command {
    info = {
        names: ['np', 'playing', 'nowplaying'],
        description: 'Shows currently playing song',
        usage: '&np',
        category: 'music'
    }

    run(message: Message, args: string[], messages: any): any {
        const player: Player = bot.player.manager.get(message.guild.id);
        const playing = bot.player.playing[message.guild.id];

        if(!player)
            return message.reply(messages.nothingPlaying);
        else {
            let now = this.calculate(Date.now()-playing.started);
            let len = this.calculate(playing.length);

            let respEmbed: RichEmbed = new RichEmbed()
                .setAuthor(messages.nowPlaying, message.author.avatarURL)
                .setColor('#0977b6')
                .setThumbnail(playing.thumbnail)
                .setTitle(playing.title)
                .setURL(playing.uri)
                .addField(messages.queryRequested, playing.requester, true)
                .addField(messages.playingTime, `${now}/${len}`, true)

            if(playing.channel) respEmbed.addField(messages.videoChannel, playing.channel, true);
            message.channel.send(respEmbed);
        }
    }

    calculate(timestamp): string {
        let length: number = Math.floor(timestamp / 1000);

        let minutes: number = Math.floor(length / 60);
        let seconds: number = length % 60;
        let time: string = `${minutes}:${("0" + seconds).slice(-2)}`;

        return time;
    }
}