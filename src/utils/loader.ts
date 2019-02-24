import { blue } from 'colors';
import { Bot } from '../bot';

import { ReadyEvent } from '../events/ready';
import { MessageEvent } from '../events/message';
import { GuildMemberAddEvent } from '../events/guildMemberAdd';

import { PingCommand } from '../commands/fun/ping';
import { GifCommand } from '../commands/fun/gif';
import { WeatherCommand } from '../commands/fun/weather';
import { CalculateCommand } from '../commands/math/calculate';
import { AutoroleCommand } from '../commands/admin/autorole';
import { GreetingCommand } from '../commands/admin/greeting';
import { SolveCommand } from '../commands/math/solve';
import { GiveawayCommand } from '../commands/fun/giveaway';
import { BanCommand } from '../commands/admin/ban';

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
        new BanCommand());
    
    console.log(blue(`Loaded ${bot.commands.length} commands`));
    console.log('');
}