"use strict";
exports.__esModule = true;
var bot_1 = require("./bot");
var token = require('../config.json').token;
exports.bot = new bot_1.Bot();
exports.bot.start(token);
