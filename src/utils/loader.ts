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
import MathCommand from '../commands/math';
import CalcCommand from '../commands/calc';
import PollCommand from '../commands/poll';
import HelpCommand from '../commands/help';
import MinecraftCommand from '../commands/minecraft';
import ChooseCommand from '../commands/choose';
import WeatherCommand from '../commands/weather';
import LanguageCommand from '../commands/language';
import GiveawayCommand from '../commands/giveaway';
import PingCommand from '../commands/ping';
import TagCommand from '../commands/tag';
import JoinCommand from '../commands/join';
import PruneCommand from '../commands/prune';
import PlayCommand from '../commands/play';
import SkipCommand from '../commands/skip';
import SayCommand from '../commands/say';
import DiceCommand from '../commands/dice';
import RankingCommand from '../commands/ranking';
import QueueCommand from '../commands/queue';
import BanCommand from '../commands/ban';

export const loadEvents = (bot: Bot): void => {
    bot.events.push(new ReadyEvent, new MessageEvent, new GuildCreateEvent,
        new GuildDeleteEvent, new GuildMemberAddEvent, new GuildMemberRemoveEvent);
    bot.events.forEach((event: Event): void => {
        bot.client.on(event.name, event.run);
    });

    console.log(blue(`Loaded ${bot.events.length} events`));
}

export const loadCommands = (bot: Bot): void => {
    bot.commands.push(new RankCommand, new TopCommand, new EvalCommand,
        new MathCommand, new PollCommand, new HelpCommand, new MinecraftCommand,
        new ChooseCommand, new WeatherCommand, new LanguageCommand,
        new GiveawayCommand, new PingCommand, new MathCommand, new CalcCommand,
        new TagCommand, new JoinCommand, new PruneCommand, new PlayCommand,
        new SkipCommand, new SayCommand, new DiceCommand, new RankingCommand,
        new QueueCommand, new BanCommand);

    console.log(blue(`Loaded ${bot.commands.length} commands`));
}

export const loadDashboard = (): void => {
    new Dashboard;
    console.log(blue('Loaded dashboard\n'));
}
