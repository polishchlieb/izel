import { Command } from '../interfaces/command';
import { Message } from 'discord.js';
import fetch from 'node-fetch';

export class SolveCommand implements Command {
    info = {
        names: ['solve'],
        description: 'Solves for "x"',
        usage: 'solve (eg. 2x + 4 = 10)'
    }

    async run(message: Message, args: string[]) {
        message.channel.startTyping();

        await fetch(`https://www.wolframalpha.com/widget/input/?input=${encodeURIComponent(args.join(' '))}&id=7953c4ea52a4873d32cc72052f3dcb10`)
            .then(res => res.text())
            .then(html => {
                message.reply(html.substring(html.lastIndexOf('alt="')).split('"')[1]);
            });
    
        message.channel.stopTyping();
    }
}