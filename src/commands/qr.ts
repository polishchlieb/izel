import Command from '../interfaces/command';
import { Message, Attachment } from 'discord.js';
import Messages from '../interfaces/messages';
import { createWriteStream, WriteStream } from 'fs';
import { get, IncomingMessage } from 'http';

export default class QrCommand implements Command {
    info = {
        names: ['qr'],
        description: 'Creates QR code',
        usage: '&qr (text..)'
    };

    run(message: Message, args: string[], messages: Messages): any {
        if(args.length == 0)
            return message.reply(`${messages.use} \`${this.info.usage}\``);

        let file: WriteStream = createWriteStream('temp2.jpg');
        get(`http://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(args.join(' '))}&chld=L|1&choe=UTF-8`, async (response: IncomingMessage): Promise<void> => {
            await response.pipe(file);
            message.channel.send({
                file: './temp2.jpg'
            });
        });
    }
}