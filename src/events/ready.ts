import { green } from 'colors';
import Event from '../interfaces/event';
import bot from '..';

export default class ReadyEvent implements Event {
    name = 'ready';

    run(): void {
        console.log(green('Bot is ready'));
        console.log(green(`Running on ${bot.client.guilds.size} servers`));
        console.log(green(`Serving ${bot.client.users.size} users\n`));

        bot.client.user.setActivity('swiezy chleb', { type: 'WATCHING' });
    }
}