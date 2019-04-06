"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const { prefix } = require('../../config.json');
class MessageEvent {
    constructor() {
        this.name = 'message';
    }
    run(message) {
        if (!message.content.startsWith(prefix)
            || message.author.bot
            || !message.guild)
            return;
        const args = message.content
            .substring(prefix.length)
            .split(' '), name = args.shift().toLowerCase(), command = __1.bot.commands.find(c => c.info.names.includes(name));
        if (command)
            command.run(__1.bot.client, message, args);
        else
            message.react('❓');
    }
}
exports.MessageEvent = MessageEvent;
