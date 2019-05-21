import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';

export default class DiceCommand implements Command {
    info = {
        names: ['dice', 'random'],
        description: 'Gives some random number (0-10)',
        usage: '&dice'
    }

    reactions: string[] = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟'];

    run(message: Message, _args: string[], messages: any): void {
        message.channel.send(new RichEmbed()
            .setTitle(messages.randomness)
            .setColor('RANDOM')
        ).then((msg: Message): void => {
            msg.react(this.reactions[Math.floor(Math.random() * 10)]);
        });
    }
}
