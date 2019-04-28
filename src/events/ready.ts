import { green } from 'colors';
import { Event } from '../interfaces/event';
import { bot } from '..';

export class ReadyEvent implements Event {
    name = 'ready';

    run(): void {
        bot.client.guilds.forEach(async guild => {
            await bot.database.collection(guild.id);

            let data: any = bot.database.collection(guild.id).findOne({
                options: true
            });

            if(!data)
                bot.database.collection(guild.id).insertOne({
                    options: true,
                    prefix: '&',
                    language: 'en'
                });
        });

        console.log(green('Bot is ready'));
        console.log(green(`Running on ${bot.client.guilds.size} servers`));
        console.log(green(`Serving ${bot.client.users.size} users\n`));

        bot.client.user.setActivity('swiezy chleb', { type: 'WATCHING' });
    }
}