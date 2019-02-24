"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var loader_1 = require("./utils/loader");
var guildDataHandler_1 = require("./utils/guildDataHandler");
var Bot = /** @class */ (function (_super) {
    __extends(Bot, _super);
    function Bot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bot.prototype.start = function (token) {
        this.initGuildData();
        this.commands = [];
        this.events = [];
        this.client = new discord_js_1.Client();
        this.client.login(token);
        process.on('unhandledRejection', function (err) {
            console.log(err);
        });
        loader_1.loadEvents(this);
        loader_1.loadCommands(this);
    };
    return Bot;
}(guildDataHandler_1.GuildDataHandler));
exports.Bot = Bot;
