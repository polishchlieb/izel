"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const { token } = require('../config.json');
exports.bot = new bot_1.Bot();
exports.bot.start(token);
