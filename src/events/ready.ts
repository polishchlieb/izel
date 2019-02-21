import { Event } from '../interfaces/event';
import { green } from 'colors';
import { bot } from '..';

export class ReadyEvent implements Event {
    name = 'ready';

    run() {
        console.log(green('Bot is ready'));
        console.log(green(`Running on ${bot.client.guilds.size} servers`));
        console.log(green(`Serving ${bot.client.users.size} users`));
    }
}