"use strict";
exports.__esModule = true;
var colors_1 = require("colors");
var __1 = require("..");
var ReadyEvent = /** @class */ (function () {
    function ReadyEvent() {
        this.name = 'ready';
    }
    ReadyEvent.prototype.run = function () {
        console.log(colors_1.green('Bot is ready'));
        console.log(colors_1.green("Running on " + __1.bot.client.guilds.size + " servers"));
        console.log(colors_1.green("Serving " + __1.bot.client.users.size + " users"));
        console.log('');
    };
    return ReadyEvent;
}());
exports.ReadyEvent = ReadyEvent;
