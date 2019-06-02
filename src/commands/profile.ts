import Command from '../interfaces/command';
import { Message, Attachment } from 'discord.js';
import { createCanvas, Canvas } from 'canvas';

export default class ProfileCommand implements Command {
    info = {
        names: ['profile'],
        description: 'Shows your profile',
        usage: '&profile { ping }'
    }

    run(message: Message, args: string[], messages: any): void {
        message.channel.startTyping();
        let canvas: Canvas = createCanvas(400, 400);
        let ctx = canvas.getContext('2d');
        ctx.font = '20px Fredoka One';
        ctx.fillText(message.member.displayName, 10, 30);
        message.channel.send('', new Attachment(canvas.createPNGStream(), ''));
        message.channel.stopTyping();
    }
}