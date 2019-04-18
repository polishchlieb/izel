import { blue } from 'colors';
import { Bot } from '../bot';

import { MessageEvent } from '../events/message';
import { ReadyEvent } from '../events/ready';

import { RankCommand } from '../commands/rank';
import { TopCommand } from '../commands/top';
import { EvalCommand } from '../commands/eval';
import { SolveCommand } from '../commands/solve';

export const loadEvents = (bot: Bot): void => {
    bot.events.push(new ReadyEvent, new MessageEvent);
    bot.events.forEach(event => {
        bot.client.on(event.name, event.run);
    });
    
    console.log(blue(`Loaded ${bot.events.length} events`));
}

export const loadCommands = (bot: Bot): void => {
    bot.commands.push(new RankCommand, new TopCommand, new EvalCommand, new SolveCommand);
    
    console.log(blue(`Loaded ${bot.commands.length} commands\n`));
}