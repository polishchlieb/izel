import { blue } from 'colors';
import { Event } from '../interfaces/event';

import { Bot } from '../bot';
import { Dashboard } from '../dashboard';

import { MessageEvent } from '../events/message';
import { ReadyEvent } from '../events/ready';
import { GuildCreateEvent } from '../events/guildCreate';

import { RankCommand } from '../commands/rank';
import { TopCommand } from '../commands/top';
import { EvalCommand } from '../commands/eval';
import { MathCommand } from '../commands/calc';

export const loadEvents = (bot: Bot): void => {
    bot.events.push(new ReadyEvent, new MessageEvent, new GuildCreateEvent);
    bot.events.forEach((event: Event) => {
        bot.client.on(event.name, event.run);
    });
    
    console.log(blue(`Loaded ${bot.events.length} events`));
}

export const loadCommands = (bot: Bot): void => {
    bot.commands.push(new RankCommand, new TopCommand, new EvalCommand, new MathCommand);
    
    console.log(blue(`Loaded ${bot.commands.length} commands\n`));
}

export const loadDashboard = (bot: Bot): void => {
    const dashboard: Dashboard = new Dashboard(bot);
    dashboard.init();
    dashboard.start();
}