"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const loader_1 = require("./utils/loader");
class Bot {
    constructor() {
        this.client = new discord_js_1.Client();
        this.commands = [];
        this.events = [];
    }
    start(token) {
        this.client.login(token);
        process.on('unhandledRejection', err => {
            console.log(err);
        });
        loader_1.loadEvents(this);
        loader_1.loadCommands(this);
    }
}
exports.Bot = Bot;
