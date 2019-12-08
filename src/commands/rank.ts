import Command from '../interfaces/command';
import { Message, Attachment, GuildMember } from 'discord.js';
import bot from '..';
import { createCanvas, loadImage, Image, Canvas } from 'canvas';
import { StatUser } from '../interfaces/databaseStructures';
import Messages from '../interfaces/messages';

let bg: Image, fg: Image;
(async () => {
    bg = await loadImage('assets/bg0.png');
    fg = await loadImage('assets/fg0.png');
})();

export default class RankCommand implements Command {
    info = {
        names: ['rank'],
        description: 'Shows your rank',
        usage: '&rank {mention}',
        category: 'stats'
    };

    async run(message: Message, _args: string[], messages: Messages): Promise<any> {
        message.channel.startTyping();

        let member: GuildMember = message.mentions.members.first();
        if(!member || !message.guild.member(member))
            member = message.member;

        let data: StatUser = await bot.stats.findOne({
            id: member.user.id,
            guild: message.guild.id
        });

        if(!data) {
            message.channel.stopTyping();
            return message.channel.send('somethin gon wrong');
        }

        let canvas: Canvas = createCanvas(800, 220);
        let ctx = canvas.getContext('2d');

        let text: string = `${data.points} ${messages.points}`;
        let image: Image = await loadImage(member.user.displayAvatarURL);
        let lvl: string = `${messages.level} ${data.level}`;

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(image, 40, 30, 160, 160);

        ctx.font = '50px Roboto Condensed';

        let size = ctx.measureText(member.displayName).width;
        if(size > 500)
            size = 500;

        ctx.fillStyle = '#ffffff'
        ctx.fillText(member.displayName, 730 - size, 65, 500);

        ctx.fillStyle = '#000000'
        ctx.fillRect(230, 150, ((data.points - (Math.pow(data.level - 1, 2) * 100)) / ((Math.pow(data.level, 2) * 100) - (Math.pow(data.level - 1, 2) * 100))) * 525, 40);

        ctx.drawImage(fg, 0, 0);

        ctx.fillStyle = '#ffffff';
        ctx.font = '30px Roboto Condensed';
        ctx.fillText(text, 730 - ctx.measureText(text).width, 110);

        ctx.fillText(lvl, 485.5 - ctx.measureText(lvl).width / 2, 180);

        message.channel.send('', new Attachment(canvas.createPNGStream(), ''));

        message.channel.stopTyping();
    }
}