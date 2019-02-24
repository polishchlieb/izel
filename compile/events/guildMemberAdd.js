"use strict";
exports.__esModule = true;
var __1 = require("..");
var GuildMemberAddEvent = /** @class */ (function () {
    function GuildMemberAddEvent() {
        this.name = 'guildMemberAdd';
    }
    GuildMemberAddEvent.prototype.run = function (member) {
        if (__1.bot.guildData[member.guild.id] && __1.bot.guildData[member.guild.id].autoRole)
            member.addRole(__1.bot.guildData[member.guild.id].autoRole);
        if (__1.bot.guildData[member.guild.id] && __1.bot.guildData[member.guild.id].greeting) {
            var g = __1.bot.guildData[member.guild.id].greeting, c = member.guild.channels.get(g[0]);
            if (g[0] == 'dm')
                member.user.send(g[1]);
            else if (c && c.type === 'text')
                c.send(g[1]);
        }
    };
    return GuildMemberAddEvent;
}());
exports.GuildMemberAddEvent = GuildMemberAddEvent;
