"use strict";
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
var SolveCommand = /** @class */ (function () {
    function SolveCommand() {
        this.info = {
            names: ['solve'],
            description: 'Solves for x',
            usage: 'solve (equation)'
        };
    }
    SolveCommand.prototype.run = function (bot, message, args) {
        message.reply('computing..');
        node_fetch_1["default"]("https://www.wolframalpha.com/widget/input/?input=" + encodeURIComponent(args.join(' ')) + "&id=7953c4ea52a4873d32cc72052f3dcb10")
            .then(function (res) { return res.text(); })
            .then(function (html) {
            message.reply(html.substring(html.lastIndexOf('alt="')).split('"')[1]);
        });
    };
    return SolveCommand;
}());
exports.SolveCommand = SolveCommand;
