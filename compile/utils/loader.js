"use strict";
exports.__esModule = true;
var colors_1 = require("colors");
var ready_1 = require("../events/ready");
var message_1 = require("../events/message");
var guildMemberAdd_1 = require("../events/guildMemberAdd");
var ping_1 = require("../commands/fun/ping");
var gif_1 = require("../commands/fun/gif");
var weather_1 = require("../commands/fun/weather");
var calculate_1 = require("../commands/math/calculate");
var autorole_1 = require("../commands/admin/autorole");
var greeting_1 = require("../commands/admin/greeting");
var solve_1 = require("../commands/math/solve");
var giveaway_1 = require("../commands/fun/giveaway");
var ban_1 = require("../commands/admin/ban");
function loadEvents(bot) {
    bot.events.push(new ready_1.ReadyEvent(), new message_1.MessageEvent(), new guildMemberAdd_1.GuildMemberAddEvent());
    bot.events.forEach(function (event) {
        bot.client.on(event.name, event.run);
    });
    console.log(colors_1.blue("Loaded " + bot.events.length + " events"));
}
exports.loadEvents = loadEvents;
function loadCommands(bot) {
    bot.commands.push(new ping_1.PingCommand(), new gif_1.GifCommand(), new weather_1.WeatherCommand(), new calculate_1.CalculateCommand(), new autorole_1.AutoroleCommand(), new greeting_1.GreetingCommand(), new solve_1.SolveCommand(), new giveaway_1.GiveawayCommand(), new ban_1.BanCommand());
    console.log(colors_1.blue("Loaded " + bot.commands.length + " commands"));
    console.log('');
}
exports.loadCommands = loadCommands;
