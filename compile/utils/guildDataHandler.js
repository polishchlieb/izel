"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var GuildDataHandler = /** @class */ (function () {
    function GuildDataHandler() {
        this.fileLocation = 'data/guildInfo.json';
        this.guildData = {};
    }
    GuildDataHandler.prototype.initGuildData = function () {
        this.guildData = JSON.parse(fs_1.readFileSync(this.fileLocation).toString());
    };
    GuildDataHandler.prototype.setGuildData = function (guild_id, data) {
        this.guildData[guild_id] = data;
        fs_1.writeFileSync(this.fileLocation, JSON.stringify(this.guildData));
    };
    GuildDataHandler.prototype.save = function () {
        fs_1.writeFileSync(this.fileLocation, JSON.stringify(this.guildData));
    };
    return GuildDataHandler;
}());
exports.GuildDataHandler = GuildDataHandler;
