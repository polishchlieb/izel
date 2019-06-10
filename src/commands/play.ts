import Command from '../interfaces/command';
import { Message, VoiceConnection, RichEmbed } from 'discord.js';
import * as ytdl from 'ytdl-core';
import bot from '..';
import fetch, { Response } from 'node-fetch';
import { QueueElement } from '../interfaces/music';

const { youtubeApi }: { youtubeApi: string } = require('../../config.json');

export default class PlayCommand implements Command {
    info = {
        names: ['play', 'p'],
        description: 'Plays music',
        usage: '&play (link|title)',
        category: 'music'
    }

    play(vc: VoiceConnection, message: Message, messages: any): void {
        const current = bot.music[message.guild.id].queue.shift();
        bot.music[message.guild.id].playing = current;

        let respEmbed: RichEmbed = new RichEmbed()
            .setAuthor(messages.nowPlaying, message.author.avatarURL)
            .setColor('#0977b6')
            .setThumbnail(current.thumbnail)
            .setTitle(current.title)
            .setURL(current.link)
            .addField(messages.queryRequested, current.requester, true);

        if(current.channel) respEmbed.addField(messages.videoChannel, current.channel, true);
        message.channel.send(respEmbed);
        
        bot.music[message.guild.id].dispatcher = vc.playStream(
            ytdl(current.link, { filter: 'audioonly' })
        );

        bot.music[message.guild.id].dispatcher.on('end', (): void => {
            if(bot.music[message.guild.id].queue[0])
                this.play(vc, message, messages);
            else {
                vc.disconnect();
                delete bot.music[message.guild.id];
            }
        });
    }

    async run(message: Message, args: string[], messages: any): Promise<string|Message|Message[]> {
        let queryObj: QueueElement;

        if(!args[0])
            return message.reply(messages.specifyURL);
        if(!message.member.voiceChannel)
            return message.reply(messages.connectVoice);
        if(args[0].match(/^(http(s)?:\/\/)?(w{3}\.)?youtu(be\.com|\.be)?\/.+/gm)) {
            queryObj = {
                title: args[0],
                link: args[0],
                thumbnail: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/92/thinking-face_1f914.png'
            };
        } else {
            try {
                const result: any = await this.search(args.join(' '));
                queryObj = {
                    title: result.title,
                    link: result.link,
                    thumbnail: result.thumbnail,
                    channel: result.channel
                };
            } catch {
                return message.reply(messages.noResults);
            }
        }
        if(!bot.music[message.guild.id])
            bot.music[message.guild.id] = {
                queue: []
            };

        queryObj.requester = message.author.username;
        bot.music[message.guild.id].queue.push(queryObj);

        let respEmbed: RichEmbed = new RichEmbed()
            .setAuthor(messages.queued, message.author.avatarURL)
            .setColor('#c91e20')
            .setThumbnail(queryObj.thumbnail)
            .setTitle(queryObj.title)
            .setURL(queryObj.link)
            .addField(messages.queryRequested, queryObj.requester, true)
            .addField(messages.positionQueue, bot.music[message.guild.id].queue.length, true)
            .setFooter(`${messages.requestedBy} ${message.member.displayName}`, message.author.avatarURL);

        if(queryObj.channel)
            respEmbed.addField(messages.videoChannel, queryObj.channel, true);
        message.channel.send(respEmbed);

        if(!message.guild.voiceConnection || !bot.music[message.guild.id].dispatcher)
            message.member.voiceChannel.join().then((vc: VoiceConnection): void => {
                this.play(vc, message, messages);
            });
    }

    search(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubeApi}&part=snippet&maxResults=1&order=relevance&q=${encodeURIComponent(query)}&type=video`)
                .then((res: Response): Promise<any> => res.json())
                .then((data: any): void => {
                    if(data.items.length > 0) {
                        resolve({
                            link: `https://youtube.com/watch?v=${data.items[0].id.videoId}`,
                            title: data.items[0].snippet.title,
                            thumbnail: data.items[0].snippet.thumbnails.default.url,
                            channel: data.items[0].snippet.channelTitle
                        });
                    } else {
                        reject('no results');
                    }
                });
        });
    }
}
