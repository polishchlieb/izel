import { green } from 'colors';
import Event from '../interfaces/event';
import bot from '..';

export default class ReadyEvent implements Event {
    name = 'ready';

    run(): void {
        console.log(green('Bot is ready'));
        console.log(green(`Running on ${bot.client.guilds.size} servers`));
        console.log(green(`Serving ${bot.client.users.size} users\n`));

        let num: number = 0;
        setInterval((): void => {
            switch(num) {
                case 0:
                    bot.client.user.setActivity(`${bot.client.users.size} users`, { type: 'WATCHING' });
                    num++; break;
                case 1:
                    bot.client.user.setActivity(`${bot.client.guilds.size} servers`, { type: 'WATCHING' });
                    num++; break;
                case 2:
                    bot.client.user.setActivity(`swiezy chleb`, { type: 'LISTENING' });
                    num = 0; break;
            }
        }, 150000);
    }
}