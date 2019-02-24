"use strict";
exports.__esModule = true;
var __1 = require("../..");
var GreetingCommand = /** @class */ (function () {
    function GreetingCommand() {
        this.info = {
            names: ['greeting', 'greet'],
            description: 'Sends specified automatically when an user joins the server',
            usage: 'greeting (dm / channel name) (text..)'
        };
    }
    GreetingCommand.prototype.run = function (bot, message, args) {
        if (!__1.bot.guildData[message.guild.id])
            __1.bot.setGuildData(message.guild.id, {});
        if (args.length < 2
            || (args[0] != 'dm' && !message.guild.channels.get(args[0]) && message.guild.channels.get(args[0]).type != 'text'))
            return message.reply("use: `" + this.info.usage + "`");
        __1.bot.guildData[message.guild.id].greeting = [args.shift(), args.join(' ')];
        __1.bot.save();
    };
    return GreetingCommand;
}());
exports.GreetingCommand = GreetingCommand;
