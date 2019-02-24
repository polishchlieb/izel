"use strict";
exports.__esModule = true;
var __1 = require("..");
var prefix = require('../../config.json').prefix;
var MessageEvent = /** @class */ (function () {
    function MessageEvent() {
        this.name = 'message';
    }
    MessageEvent.prototype.run = function (message) {
        handleCommand(message);
    };
    return MessageEvent;
}());
exports.MessageEvent = MessageEvent;
function handleCommand(message) {
    if (!message.content.startsWith(prefix)
        || message.author.bot
        || !message.guild)
        return;
    var args = message.content
        .substring(prefix.length)
        .split(' '), name = args.shift(), command = __1.bot.commands.find(function (c) { return c.info.names.includes(name.toLowerCase()); });
    if (command)
        command.run(__1.bot.client, message, args);
    else
        message.react('❓');
}
