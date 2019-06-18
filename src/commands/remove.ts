import Command from "../interfaces/command";
import { Message } from "discord.js";
import Messages from "../interfaces/messages";
import { Player } from "discord.js-lavalink";
import bot from "..";

export default class RemoveCommand implements Command {
    info = {
        names: ['remove', 'rm'],
        description: 'Adds a song to the top of queue',
        usage: 'remove (number)',
        category: 'music (DJ)'
    }

    run(message: Message, args: string[], messages: Messages): void | Promise<Message | Message[]> {
        const player: Player = bot.player.manager.get(message.guild.id);
        const queue = bot.player.queue[message.guild.id];

        if(message.member.roles.find('name', 'DJ') || message.member.permissions.hasPermission("ADMINISTRATOR")) {
            if (!player) {
                return message.reply(messages.nothingPlaying);
            }

            const toRemove = Number(args[0]);

            if (!toRemove) {
                return message.reply(`${messages.use} ${this.info.usage}`)
            }

            if (queue[toRemove - 1]) {
                queue.splice(toRemove - 1, 1);
            } else {
                return message.reply(messages.noSuchNumber)
            }

        } else {
            return message.reply(messages.djRole);
        }
        
    }
}