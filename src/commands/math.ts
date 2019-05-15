import { Message } from 'discord.js';
import fetch, { Response } from 'node-fetch';
import Command from '../interfaces/command';

export default class MathCommand implements Command {
    info = {
        names: ['math', 'tex'],
        description: 'Pretties some math',
        usage: '&math (...)'
    }

    run(message: Message, args: string[]): any {
        if(args.length == 0)
            return message.reply(`use: \`${this.info.usage}\``);

        fetch('https://www.quicklatex.com/latex3.f', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                formula: args.join(' '),
                fsize: '40px',
                fcolor: '000000',
                preamble: '\\usepackage{amsmath}\n\\usepackage{amsfonts}\n\\usepackage{amssymb}',
                mode: '1',
                out: '1'
            })
        })
            .then((res: Response): Promise<string> => res.text())
            .then((data: string): void => {
                message.channel.send({
                    files: [data.split('\n')[1].split(' ')[0]]
                });
            });

    }
}