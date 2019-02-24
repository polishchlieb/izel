"use strict";
exports.__esModule = true;
var BanCommand = /** @class */ (function () {
    function BanCommand() {
        this.info = {
            names: ['ban'],
            description: 'Bans an user',
            usage: 'ban (ping) [reason..]'
        };
    }
    BanCommand.prototype.run = function (bot, message, args) {
        if (args.length == 0)
            return message.reply("use: `" + this.info.usage + "`");
        if (!(message.mentions && message.mentions.members))
            return message.reply("use: `" + this.info.usage + "`");
        var member = message.mentions.members.first();
        if (member.bannable)
            member.ban(args.slice(1).join(' '))
                .then(function () { return message.reply("banned " + member.user.toString()); })["catch"](function () { return message.reply('couldn\'t ban this user'); });
        else
            message.reply('cannot ban this user');
    };
    return BanCommand;
}());
exports.BanCommand = BanCommand;
