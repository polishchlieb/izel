import { Command } from '../../interfaces/command';
import { Client, Message } from 'discord.js';
import fetch from 'node-fetch';

export class GifCommand implements Command {
    info = {
        names: ['gif'],
        description: 'Shows random gif with given tag',
        usage: 'gif (tag..)'
    }

    run(bot: Client, message: Message, args: string[]) {
        if(args.length == 0) {
            message.reply(`use: \`${this.info.usage}\``);
            return;
        }

        fetch(`https://api.giphy.com/v1/gifs/random?tag=${encodeURIComponent(args.join(' '))}&api_key=FL2ZwyIUv0MlaPOkVSApnUUXJnp0qc4n`)
            .then(res => res.json())
            .then(json => json.data.url)
            .then(url => message.reply(url));
    }
}