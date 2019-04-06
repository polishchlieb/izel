import { blue } from 'colors';
import { Bot } from '../bot';

import { GuildMemberAddEvent } from '../events/guildMemberAdd';
import { MessageEvent } from '../events/message';
import { ReadyEvent } from '../events/ready';

import { HelloCommand } from '../commands/hello';

export function loadEvents(bot: Bot) {
    bot.events.push(new ReadyEvent(), new MessageEvent(),
        new GuildMemberAddEvent());

    bot.events.forEach(event => {
        bot.client.on(event.name, event.run);
    });
    
    console.log(blue(`Loaded ${bot.events.length} events`));
}

export function loadCommands(bot: Bot) {
    bot.commands.push(new HelloCommand());
    
    console.log(blue(`Loaded ${bot.commands.length} commands\n`));
}