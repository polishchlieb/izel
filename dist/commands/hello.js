"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloCommand {
    constructor() {
        this.info = {
            names: ['hello'],
            description: '',
            usage: 'hello'
        };
    }
    run(bot, message, args) {
        message.reply('Hello, `' + args.join(' ') + '`');
    }
}
exports.HelloCommand = HelloCommand;
