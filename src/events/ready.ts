import { green, yellow } from 'colors';
import fetch, { Response } from 'node-fetch';
import Event from '../interfaces/event';
import bot from '..';

const { version }: { version: string } = require('../../package.json');

export default class ReadyEvent implements Event {
    name = 'ready';

    async run(): Promise<void> {
        console.log(yellow('Checking for updates..'));
        let data: any = await fetch('https://raw.githubusercontent.com/polishchlieb/izel/master/package.json')
            .then((res: Response): Promise<any> => res.json());
        if(data.version != version)
            console.log(yellow(`Update is available: version ${version}\n`));
        
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