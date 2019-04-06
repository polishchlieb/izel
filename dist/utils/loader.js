"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const guildMemberAdd_1 = require("../events/guildMemberAdd");
const message_1 = require("../events/message");
const ready_1 = require("../events/ready");
const hello_1 = require("../commands/hello");
function loadEvents(bot) {
    bot.events.push(new ready_1.ReadyEvent(), new message_1.MessageEvent(), new guildMemberAdd_1.GuildMemberAddEvent());
    bot.events.forEach(event => {
        bot.client.on(event.name, event.run);
    });
    console.log(colors_1.blue(`Loaded ${bot.events.length} events`));
}
exports.loadEvents = loadEvents;
function loadCommands(bot) {
    bot.commands.push(new hello_1.HelloCommand());
    console.log(colors_1.blue(`Loaded ${bot.commands.length} commands\n`));
}
exports.loadCommands = loadCommands;
