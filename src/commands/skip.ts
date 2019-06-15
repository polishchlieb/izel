import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';
import Messages from '../interfaces/messages';

export default class SkipCommand implements Command {
    info = {
        names: ['skip', 's'],
        description: 'Skips current song',
        usage: '&skip',
        category: 'music'
    };

    run(message: Message, []: string[], messages: Messages): any {
        if(!message.member.voiceChannel)
            message.reply(messages.connectVoice);

        let player = bot.player.manager.get(message.guild.id);
        let skipping = bot.player.settings[message.guild.id].skipping;

        if (!player) {
            return message.reply(messages.notPlaying)
        }

        if(message.member.voiceChannel.id == player.channel) {
            if (message.member.roles.find('name', 'DJ') || message.member.permissions.hasPermission("ADMINISTRATOR")) {
                if (player) {
                    player.stop();
                    return message.reply(messages.skipped);
                }
            }

            if (skipping.indexOf(message.author.id) == -1) {
                skipping.push(message.author.id);
                if(skipping.length >= (message.member.voiceChannel.members.size-1)/2) {
                    if (player) {
                        player.stop();
                        return message.reply(messages.skipped);
                    }
                } else {
                    message.reply(messages.skippedNeed + ` ${skipping.length} / ${Math.ceil((message.member.voiceChannel.members.size - 1) / 2)}`)
                }
            } else {
                message.reply(messages.skippedAlready)
            }
        } else {
            message.reply(messages.connectVoice);
        }
    }
}
