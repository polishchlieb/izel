import { Bot } from './bot';

const { token }: { token: string } = require('../config.json');
export const bot: Bot = new Bot();

bot.start(token);