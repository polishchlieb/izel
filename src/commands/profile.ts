import Command from '../interfaces/command';
import { Message, Attachment, GuildMember, Status } from 'discord.js';
import { createCanvas, Canvas, Image, loadImage } from 'canvas';
import { StatUser } from '../interfaces/databaseStructures';
import bot from '..';

let bg: Image;
(async () => {
    bg = await loadImage('assets/ussr.png');
})();

export default class ProfileCommand implements Command {
    info = {
        names: ['profile'],
        description: 'Epic profile',
        usage: '&profile { ping }',
        category: 'stats'
    };

    async run(message: Message): Promise<any> {
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

        let canvas: Canvas = createCanvas(465, 559);
        let ctx = canvas.getContext('2d');

        ctx.drawImage(bg, 0, 0);

        let image: Image = await loadImage(member.user.displayAvatarURL);
        ctx.drawImage(image, 253, 102, 200, 200);

        ctx.font = '40px Fredoka One';

        let users: StatUser[] = await bot.stats.find().sort({ messages: -1 }).toArray();

        // TODO: improve (xD)
        let global_top: number = users
            .map((v: StatUser, i: number): [number, StatUser] => [i, v])
            .find((v: [number, StatUser]): boolean => v[1].id == member.user.id)
            [0] + 1;
        ctx.fillText(`numer ${global_top}`, 158, 364);

        let coins: number = (await bot.stats.find({ id: member.user.id })
            .toArray()).map((u: StatUser): number => u.points)
            .reduce((prev: number, curr: number): number => prev + curr);
        ctx.fillText(`${coins} pienionzkuw`, 112, 424);


        ctx.fillText('yet another klops', 112, 473)

        
        message.channel.send('', new Attachment(canvas.createPNGStream(), ''));
        message.channel.stopTyping();
    }
}