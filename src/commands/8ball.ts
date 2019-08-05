import Command from "../interfaces/command";
import { Message } from "discord.js";
import Messages from "../interfaces/messages";

export default class Eightballcommand implements Command {
    info = {
        names: ['8ball'],
        description: 'Gives you an answer',
        usage: '8ball <question>',
        category: 'games'
    }

    run(message: Message, [...arg]: string[], messages: Messages) {
        if (arg.length == 0)
            return message.reply(`${messages.use} ${this.info.usage}`);

        const answer: string = messages.ballAnswers[Math.floor(Math.random() * messages.ballAnswers.length)];

        message.channel.send(`\🎱 ${answer}`);
    }
}