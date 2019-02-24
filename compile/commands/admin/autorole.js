"use strict";
exports.__esModule = true;
var __1 = require("../..");
var AutoroleCommand = /** @class */ (function () {
    function AutoroleCommand() {
        this.info = {
            names: ['autorole'],
            description: 'Assigns a role automatically when an user joins the server',
            usage: 'autorole'
        };
    }
    AutoroleCommand.prototype.run = function (bot, message, args) {
        if (!__1.bot.guildData[message.guild.id])
            __1.bot.setGuildData(message.guild.id, {});
        var role = message.guild.roles.find(function (r) { return r.name.toLowerCase().includes(args.join(' ').toLowerCase()); });
        if (!role)
            return message.reply('role doesn\'t exist');
        if (role.position >= message.guild.me.highestRole.position)
            return message.reply('cannot make an autorole higher or equal to bot\'s highest role');
        __1.bot.guildData[message.guild.id].autoRole = role.id;
        __1.bot.save();
        message.reply("set the autorole to `" + role.name + "`");
    };
    return AutoroleCommand;
}());
exports.AutoroleCommand = AutoroleCommand;
