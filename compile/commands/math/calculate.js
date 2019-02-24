"use strict";
exports.__esModule = true;
var mathjs_1 = require("mathjs");
exports.scope = {};
var CalculateCommand = /** @class */ (function () {
    function CalculateCommand() {
        this.info = {
            names: ['calculate', 'calc'],
            description: 'Calculate given math expression',
            usage: 'calculate (expr..)'
        };
    }
    CalculateCommand.prototype.run = function (bot, message, args) {
        var result;
        try {
            result = mathjs_1.eval(args.join(' '), exports.scope);
        }
        catch (e) {
            message.reply(':shrug:');
        }
        finally {
            message.reply(result);
        }
    };
    return CalculateCommand;
}());
exports.CalculateCommand = CalculateCommand;
