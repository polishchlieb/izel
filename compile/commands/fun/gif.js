"use strict";
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
var GifCommand = /** @class */ (function () {
    function GifCommand() {
        this.info = {
            names: ['gif'],
            description: 'Shows random gif with given tag',
            usage: 'gif (tag..)'
        };
    }
    GifCommand.prototype.run = function (bot, message, args) {
        if (args.length == 0) {
            message.reply("use: `" + this.info.usage + "`");
            return;
        }
        node_fetch_1["default"]("https://api.giphy.com/v1/gifs/random?tag=" + encodeURIComponent(args.join(' ')) + "&api_key=FL2ZwyIUv0MlaPOkVSApnUUXJnp0qc4n")
            .then(function (res) { return res.json(); })
            .then(function (json) { return json.data.url; })
            .then(function (url) { return message.reply(url); });
    };
    return GifCommand;
}());
exports.GifCommand = GifCommand;
