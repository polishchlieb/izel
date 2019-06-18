import Command from '../interfaces/command';
import { Message, Attachment } from 'discord.js';
import { createCanvas, Canvas } from 'canvas';
import { StatUser } from '../interfaces/databaseStructures';
import bot from '..';

export default class ProfileCommand implements Command {
    info = {
        names: ['profile'],
        description: 'Shows your profile',
        usage: '&profile { ping }',
        category: 'stats'
    };

    async run(message: Message): Promise<void> {
        message.channel.startTyping();
        let canvas: Canvas = createCanvas(400, 400);
        let ctx = canvas.getContext('2d');
        ctx.font = '20px Fredoka One';
        ctx.fillText(message.member.displayName, 10, 30);

        let coins: number = (await bot.stats.find({ id: message.author.id })
            .toArray()).map((u: StatUser): number => u.messages)
            .reduce((prev: number, curr: number): number => prev + curr);
        ctx.fillText(`${coins} punkcikow loncznie`, 10, 60);

        message.channel.send('', new Attachment(canvas.createPNGStream(), ''));
        message.channel.stopTyping();
    }
}