"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var node_fetch_1 = require("node-fetch");
var appid = 'your openweatherapi appid';
var WeatherCommand = /** @class */ (function () {
    function WeatherCommand() {
        this.info = {
            names: ['weather'],
            description: 'Shows weather for given location',
            usage: 'weather (city / country)'
        };
    }
    WeatherCommand.prototype.run = function (bot, message, args) {
        if (args.length == 0)
            return message.reply('');
        node_fetch_1["default"]("http://api.openweathermap.org/data/2.5/weather?APPID=" + appid + "&units=metric&q=" + encodeURI(args.join(' ')))
            .then(function (res) { return res.json(); })
            .then(function (json) { return message.channel.send(new discord_js_1.RichEmbed()
            .setTitle("Weather for " + json.name)
            .setColor([102, 0, 255])
            .addField('Temperature', json.main.temp + " \u00B0C")
            .addField('Wind speed', json.wind.speed + " m/s")
            .addField('Pressure', json.main.pressure + " hPa")
            .setFooter("Requested by " + message.author.toString(), message.author.avatarURL)); });
    };
    return WeatherCommand;
}());
exports.WeatherCommand = WeatherCommand;
