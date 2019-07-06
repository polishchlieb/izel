import Command from "../interfaces/command";
import { Message, Role } from "discord.js";
import Messages from "../interfaces/messages";
import bot from "..";
import { Player } from "discord.js-lavalink";

export default class LoopCommand implements Command {
    info = {
        names: ['loop'],
        description: 'Toggles loop',
        usage: 'loop',
        category: 'music (DJ)'
    };

    run(message: Message, []: string[], messages: Messages) {
        const player: Player = bot.player.manager.get(message.guild.id);

        if (!player)
            return message.reply(messages.notPlaying);

        let loop: boolean = bot.player.settings[message.guild.id].loop;
        if (message.member.voiceChannel.id == player.channel) {
            if (message.member.roles.find((r: Role): boolean => r.name == 'DJ')
               || message.member.hasPermission('ADMINISTRATOR')) {
                if(!loop) {
                    bot.player.settings[message.guild.id].loop = true;
                    message.react('🔁');
                } else {
                    bot.player.settings[message.guild.id].loop = false;
                    message.react('🛑');
                }
            } else {
                return message.reply(messages.djRole);
            }
        } else {
            message.reply(messages.connectVoice)
        }
    }
}