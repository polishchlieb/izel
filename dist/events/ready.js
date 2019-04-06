"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const __1 = require("..");
class ReadyEvent {
    constructor() {
        this.name = 'ready';
    }
    run() {
        console.log(colors_1.green('Bot is ready'));
        console.log(colors_1.green(`Running on ${__1.bot.client.guilds.size} servers`));
        console.log(colors_1.green(`Serving ${__1.bot.client.users.size} users\n`));
    }
}
exports.ReadyEvent = ReadyEvent;
