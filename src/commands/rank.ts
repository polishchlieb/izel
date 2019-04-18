import { Command } from '../interfaces/command';
import { Message, Attachment } from 'discord.js';
import { bot } from '..';
import { createCanvas, loadImage, Image, Canvas } from 'canvas';

let bg: Image, fg: Image;
(async () => {
    bg = await loadImage('assets/bg0.png');
    fg = await loadImage('assets/fg0.png');
})();

export class RankCommand implements Command {
    info = {
        names: ['rank'],
        description: 'Shows your rank',
        usage: 'rank'
    }

    async run(message: Message, args: string[]): Promise<void> {
        message.channel.startTyping();

        // find user -> const data
        let data: any = await bot.database.collection(message.guild.id).findOne({
            id: message.author.id
        });

        let canvas: Canvas = createCanvas(800, 220);
        let ctx = canvas.getContext('2d');

        let text: string = `${data.messages} wiadomosci`;
        let image: Image = await loadImage(message.author.avatarURL);
        let lvl: string = 'LEVEL ' + data.level;

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(image, 40, 30, 160, 160);
        ctx.font = '50px Fredoka One';
        ctx.fillText(message.member.displayName, 730 - ctx.measureText(message.member.displayName).width, 65);
        ctx.fillRect(230, 150, (data.messages / ((data.level + 1) * 200)) * 525, 40);
        ctx.drawImage(fg, 0, 0);
        ctx.font = '30px Fredoka One';
        ctx.fillText(text, 730 - ctx.measureText(text).width, 110);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(lvl, 485.5 - ctx.measureText(lvl).width / 2, 180);
		
        message.channel.send('', new Attachment(canvas.createPNGStream(), ''));
        message.channel.stopTyping();
    }
}