import { Command } from '../../interfaces/command';
import { Client, Message, RichEmbed } from 'discord.js';
import fetch from 'node-fetch';

const appid = require('../../../config.json').openWeatherAPI;

export class WeatherCommand implements Command {
    info = {
        names: ['weather'],
        description: 'Shows weather for given location',
        usage: 'weather (city / country)'
    }

    run(bot: Client, message: Message, args: string[]) {
        if(args.length == 0)
            return message.reply('')
        fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=${appid}&units=metric&q=${encodeURI(args.join(' '))}`)
            .then(res => res.json())
            .then(json => message.channel.send(new RichEmbed()
                .setTitle(`Weather for ${json.name}`)
                .setColor([102, 0, 255])
                .addField('Temperature', `${json.main.temp} °C`)
                .addField('Wind speed', `${json.wind.speed} m/s`)
                .addField('Pressure', `${json.main.pressure} hPa`)
                .setFooter(`Requested by ${message.author.toString()}`,
                    message.author.avatarURL)));
    }
}