import { blue } from 'colors';
import { Bot } from './bot';

import { ReadyEvent } from './events/ready';
import { MessageEvent } from './events/message';

import { TestCommand } from './commands/test';
import { GifCommand } from './commands/gif';
import { WeatherCommand } from './commands/weather';

export function loadEvents(bot: Bot) {
    bot.events.push(new ReadyEvent(), new MessageEvent());

    bot.events.forEach(event => {
        bot.client.on(event.name, event.run);
    });
    
    console.log(blue(`Loaded ${bot.events.length} events`));
}

export function loadCommands(bot: Bot) {
    bot.commands.push(new TestCommand(), new GifCommand(),
        new WeatherCommand());
    
    console.log(blue(`Loaded ${bot.commands.length} commands`));
    console.log('');
}