import { blue } from 'colors';
import { Bot } from '../bot';

import { GuildMemberAddEvent } from '../events/guildMemberAdd';
import { MessageEvent } from '../events/message';
import { ReadyEvent } from '../events/ready';

import { AutoroleCommand } from '../commands/admin/autorole';
import { BanCommand } from '../commands/admin/ban';
import { GreetingCommand } from '../commands/admin/greeting';
import { KickCommand } from '../commands/admin/kick';
import { GifCommand } from '../commands/fun/gif';
import { PingCommand } from '../commands/fun/ping';
import { GiveawayCommand } from '../commands/fun/giveaway';
import { PollCommand } from '../commands/fun/poll';
import { WeatherCommand } from '../commands/fun/weather';
import { CalculateCommand } from '../commands/math/calculate';
import { SolveCommand } from '../commands/math/solve';

export function loadEvents(bot: Bot) {
    bot.events.push(new ReadyEvent(), new MessageEvent(),
        new GuildMemberAddEvent());

    bot.events.forEach(event => {
        bot.client.on(event.name, event.run);
    });
    
    console.log(blue(`Loaded ${bot.events.length} events`));
}

export function loadCommands(bot: Bot) {
    bot.commands.push(new PingCommand(), new GifCommand(),
        new WeatherCommand(), new CalculateCommand(), new AutoroleCommand(),
        new GreetingCommand(), new SolveCommand(), new GiveawayCommand(),
        new BanCommand(), new PollCommand(), new KickCommand());
    
    console.log(blue(`Loaded ${bot.commands.length} commands`));
    console.log('');
}