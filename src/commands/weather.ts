import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import fetch, { Response } from 'node-fetch';

export default class WeatherCommand implements Command {
    info = {
        names: ['weather'],
        description: 'chmurki or sloneczko',
        usage: 'weather (city)'
    }

    run(message: Message, args: string[], messages: any): void {
        fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=121a5f2255696f766cba3aeb00c73fad&units=metric&q=${encodeURIComponent(args.join(' '))}`)
            .then((res: Response): any => res.json())
            .then((data: any): any => {
                if(data.cod != 200)
                    return message.reply(messages.cityNotFound);

                message.channel.send(new RichEmbed()
                    .setTitle(`${messages.weatherFor} ${data.name}`)
                    .setColor('RANDOM')
                    .addField(messages.temperature, `${Math.floor(data.main.temp)} °C`)
                    .addField(messages.windSpeed, `${data.wind.speed} m/s`)
                    .addField(messages.pressure, `${data.main.pressure} hPa`)
                    .setFooter(`${messages.requestedBy} ${message.member.displayName}`, message.author.avatarURL))
            });
    }
}