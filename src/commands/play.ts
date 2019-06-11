import Command from '../interfaces/command';
import { Message, VoiceConnection, RichEmbed } from 'discord.js';
import bot from '..';
import { getSongs } from '../utils/music';
import { Track } from '../interfaces/player';
import { Player } from 'discord.js-lavalink';

const { youtubeApi }: { youtubeApi: string } = require('../../config.json');

export default class PlayCommand implements Command {
    info = {
        names: ['play', 'p'],
        description: 'Plays music',
        usage: '&play (link|title)',
        category: 'music'
    }

    async run(message: Message, args: string[], messages: any): Promise<void|Message|Message[]> {
        let track: Track;

        if (!args[0])
            return message.reply(messages.specifyURL);
        if (!message.member.voiceChannel)
            return message.reply(messages.connectVoice);
        if (args[0].match(/^(http(s)?:\/\/)/g)) { // some link boi
            try {
                let results = await getSongs(args[0]);
                track = results[0];
            } catch (err) {
                return message.reply(err);
            }
        } else { // metube serch
            try {
                let results = await getSongs('ytsearch:'+args.join(' '));
                if(results.length > 0) {
                    track = results[0];
                }
            } catch {
                return message.reply(messages.noResults);
            }
        }
        
        if (!bot.player.queue[message.guild.id])
            bot.player.queue[message.guild.id] = [];

        let thumbnail;

        if (args[0].match(/^(http(s)?:\/\/)/g)) {
            if (args[0].match(/^(http(s)?:\/\/)?(w{3}\.)?youtu(be\.com|\.be)?\/.+/gm)) {
                thumbnail = `https://i.ytimg.com/vi/${track.info.identifier}/hqdefault.jpg`
            } else {
                thumbnail = 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/92/thinking-face_1f914.png'
            }
        } else {
            thumbnail = `https://i.ytimg.com/vi/${track.info.identifier}/hqdefault.jpg`
        }
        
        bot.player.queue[message.guild.id].push({
            track: track.track,
            title: track.info.title,
            channel: track.info.author,
            requester: message.author.username,
            uri: track.info.uri,
            length: track.info.length,
            stream: track.info.isStream,
            thumbnail
        })

        let respEmbed: RichEmbed = new RichEmbed()
            .setAuthor(messages.queued, message.author.avatarURL)
            .setColor('#c91e20')
            .setThumbnail(thumbnail)
            .setTitle(track.info.title)
            .setURL(track.info.uri)
            .addField(messages.positionQueue, bot.player.queue[message.guild.id].length, true)
            .addField(messages.queryRequested, message.author.username, true)
            if (track.info.author) respEmbed.addField(messages.videoChannel, track.info.author)
            respEmbed.setFooter(`${messages.requestedBy} ${message.member.displayName}`, message.author.avatarURL);

        

        message.channel.send(respEmbed);

        if (!bot.player.manager.get(message.guild.id)) {
            let player = await bot.player.manager.join({
                guild: message.guild.id,
                channel: message.member.voiceChannel.id,
                host: bot.player.nodes[0].host
            }, { selfdeaf: true })

            this.play(player, message, messages)
        }
    }

    play(player: Player, message: Message, messages: any): void {
        const current = bot.player.queue[message.guild.id].shift();
        current.started = Date.now();
        bot.player.playing[message.guild.id] = current;

        player.play(current.track);

        let respEmbed: RichEmbed = new RichEmbed()
            .setAuthor(messages.nowPlaying, message.author.avatarURL)
            .setColor('#0977b6')
            .setThumbnail(current.thumbnail)
            .setTitle(current.title)
            .setURL(current.uri)
            .addField(messages.queryRequested, current.requester, true)
        if(current.channel) respEmbed.addField(messages.videoChannel, current.channel, true);

        // TODO: ulubione
        message.channel.send(respEmbed);

        player.once('end', (): void => {
            if(bot.player.queue[message.guild.id][0]) { // nastepna pioseneczka prosze
                this.play(player, message, messages);
            } else { // konczymy fest :(
                bot.player.manager.leave(message.guild.id);
                delete bot.player.queue[message.guild.id];
                delete bot.player.playing[message.guild.id];
            }
        })
    }
}
