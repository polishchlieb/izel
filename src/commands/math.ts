import { Message } from 'discord.js';
import Command from '../interfaces/command';
import { get, IncomingMessage } from 'http';
import { createWriteStream, WriteStream } from 'fs';

export default class MathCommand implements Command {
    info = {
        names: ['math', 'tex'],
        description: 'Pretties some math',
        usage: '&math (..)'
    }

    run(message: Message, args: string[], messages: any): any {
        if(args.length == 0)
            return message.reply(`${messages.use}: \`${this.info.usage}\``);

        let file: WriteStream = createWriteStream('temp.jpg');
        get(`http://latex.codecogs.com/png.latex?%5Cbg_white%20%5Chuge%20${encodeURIComponent(args.join(' '))}%24`, async (response: IncomingMessage): Promise<void> => {
            await response.pipe(file);
            message.channel.send({
                file: './temp.jpg'
            });
        });
    }
}