import { blue } from 'colors';
import Event from '../interfaces/event';

import Bot from '../bot';
import Dashboard from '../dashboard';

import MessageEvent from '../events/message';
import ReadyEvent from '../events/ready';
import GuildCreateEvent from '../events/guildCreate';
import GuildDeleteEvent from '../events/guildDelete';
import GuildMemberAddEvent from '../events/guildMemberAdd';
import GuildMemberRemoveEvent from '../events/guildMemberRemove';

import RankCommand from '../commands/rank';
import TopCommand from '../commands/top';
import EvalCommand from '../commands/eval';
import MathCommand from '../commands/calc';
import PollCommand from '../commands/poll';
import HelpCommand from '../commands/help';
import PrefixCommand from '../commands/prefix';

export const loadEvents = (bot: Bot): void => {
    bot.events.push(new ReadyEvent, new MessageEvent, new GuildCreateEvent, new GuildDeleteEvent,
        new GuildMemberAddEvent, new GuildMemberRemoveEvent);
    bot.events.forEach((event: Event): void => {
        bot.client.on(event.name, event.run);
    });
    
    console.log(blue(`Loaded ${bot.events.length} events`));
}

export const loadCommands = (bot: Bot): void => {
    bot.commands.push(new RankCommand, new TopCommand, new EvalCommand, new MathCommand,
        new PollCommand, new HelpCommand, new PrefixCommand);
    
    console.log(blue(`Loaded ${bot.commands.length} commands`));
}

export const loadDashboard = (bot: Bot): void => {
    const dashboard: Dashboard = new Dashboard;
    dashboard.init();
    dashboard.start();

    console.log(blue('Loaded dashboard\n'));
}