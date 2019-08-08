import { blue } from 'colors';
import { PlayerManager } from 'discord.js-lavalink';

import Event from '../interfaces/event';
import Bot from '../bot';
import Dashboard from '../dashboard';

import MessageEvent from '../events/message';
import ReadyEvent from '../events/ready';
import GuildCreateEvent from '../events/guildCreate';
import GuildDeleteEvent from '../events/guildDelete';
import GuildMemberAddEvent from '../events/guildMemberAdd';
import GuildMemberRemoveEvent from '../events/guildMemberRemove';
import MessageReactionAddEvent from '../events/messageReactionAdd';
import MessageReactionRemoveEvent from '../events/messageReactionAdd';

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
import PruneCommand from '../commands/prune';
import PlayCommand from '../commands/play';
import SkipCommand from '../commands/skip';
import SayCommand from '../commands/say';
import DiceCommand from '../commands/dice';
import RankingCommand from '../commands/ranking';
import QueueCommand from '../commands/queue';
import BanCommand from '../commands/ban';
import ServerInfoCommand from '../commands/serverinfo';
import PermissionsCommand from '../commands/permissions';
import KickCommand from '../commands/kick';
import StopCommand from '../commands/stop';
import PrefixCommand from '../commands/prefix';
import StatsCommand from '../commands/stats';
import ExecCommand from '../commands/exec';
import ProfileCommand from '../commands/profile';
import AutoRoleCommand from '../commands/autorole';
import GreetingCommand from '../commands/greeting';
import PlayingCommand from '../commands/playing';
import ChannelCommand from '../commands/channel';
import RadioCommand from '../commands/radio';
import RemoveCommand from '../commands/remove';
import ClearqueueCommand from '../commands/clearqueue';
import BassCommand from '../commands/bass';
import AvatarCommand from '../commands/avatar';
import Eightballcommand from '../commands/8ball';
import SueCommand from '../commands/sue';
import LoopCommand from '../commands/loop';
import EmbedCommand from '../commands/embed';
import QrCommand from '../commands/qr';
import ClickroleCommand from '../commands/clickrole';

export const loadEvents = (bot: Bot): void => {
    bot.events.push(new ReadyEvent, new MessageEvent, new GuildCreateEvent,
        new GuildDeleteEvent, new GuildMemberAddEvent, new GuildMemberRemoveEvent,
        new MessageReactionAddEvent, new MessageReactionRemoveEvent);
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
        new TagCommand, new PruneCommand, new PlayCommand,
        new SkipCommand, new SayCommand, new DiceCommand, new RankingCommand,
        new QueueCommand, new BanCommand, new ServerInfoCommand,
        new PermissionsCommand, new KickCommand, new StopCommand,
        new PrefixCommand, new StatsCommand, new ExecCommand, new ProfileCommand,
        new AutoRoleCommand, new GreetingCommand, new PlayingCommand, new ChannelCommand,
        new RadioCommand, new RemoveCommand, new ClearqueueCommand, new BassCommand,
        new AvatarCommand, new Eightballcommand, new SueCommand, new LoopCommand,
        new EmbedCommand, new QrCommand, new ClickroleCommand);

    console.log(blue(`Loaded ${bot.commands.length} commands`));
}

export const loadDashboard = (): void => {
    new Dashboard;
    console.log(blue('Loaded dashboard\n'));
}

export const loadPlayer = (bot: Bot): void => {
    bot.player.nodes = [
        { host: 'localhost', port: 2333, password: 'totallydefaultpassword' }
    ];

    bot.player.manager = new PlayerManager(bot.client, bot.player.nodes, {
        user: bot.client.user.id,
        shards: 0
    });

    bot.player.queue = {};
    bot.player.playing = {};
    bot.player.settings = {};
}
