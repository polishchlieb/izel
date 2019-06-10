import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import bot from '..';
import { MusicServer, QueueElement } from '../interfaces/music';

export default class PlayingCommand implements Command {
    info = {
        names: ['playing', 'np', 'nowplaying'],
        description: 'Shows currently playing song',
        usage: '&np',
        category: 'music'
    }

    run(message: Message, args: string[], messages: any): any {
        const server: MusicServer = bot.music[message.guild.id];

        if(!server)
            return message.reply(messages.nothingPlaying);
        else {
            let { playing }: MusicServer = server;
            let respEmbed: RichEmbed = new RichEmbed()
                .setAuthor(messages.nowPlaying, message.author.avatarURL)
                .setColor('#0977b6')
                .setThumbnail(playing.thumbnail)
                .setTitle(playing.title)
                .setURL(playing.link)
                .addField(messages.queryRequested, playing.requester, true);

            if(playing.channel) respEmbed.addField(messages.videoChannel, playing.channel, true);
            message.channel.send(respEmbed);
        }
    }
}