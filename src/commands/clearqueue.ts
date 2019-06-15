import Command from "../interfaces/command";
import { Message } from "discord.js";
import Messages from "../interfaces/messages";
import { Player } from "discord.js-lavalink";
import bot from "..";

export default class ClearqueueCommand implements Command {
    info = {
        names: ['clearqueue'],
        description: 'clears queue',
        usage: 'clearqueue',
        category: 'music (DJ)'
    }

    run(message: Message, args: string[], messages: Messages) {
        const player: Player = bot.player.manager.get(message.guild.id);

        if (message.member.roles.find('name', 'DJ') || message.member.permissions.hasPermission("ADMINISTRATOR")) {
            if (!player) {
                return message.reply(messages.nothingPlaying);
            }

            bot.player.queue[message.guild.id] = [];
            message.react('✅');
        } else {
            return message.reply(messages.djRole);
        }
    }
}