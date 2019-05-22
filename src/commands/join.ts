import Command from '../interfaces/command';
import { Message } from 'discord.js';

export default class JoinCommand implements Command {
    info = {
        names: ['join'],
        description: 'rowniez tylko dla rzadu',
        usage: '&join'
    }

    run(message: Message, _args: string[], messages: any): any {
        message.member.voiceChannel.join().then((): void => {
            message.reply(`${messages.joined} ${message.member.voiceChannel.name}`);
        });
    }
}
