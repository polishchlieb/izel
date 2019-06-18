import Command from '../interfaces/command';
import { Message } from 'discord.js';
import Messages from '../interfaces/messages';

export default class JoinCommand implements Command {
    info = {
        names: ['join'],
        description: 'rowniez tylko dla rzadu',
        usage: '&join',
        category: 'developer'
    };

    run(message: Message, _args: string[], { joined }: Messages): any {
        message.member.voiceChannel.join().then((): void => {
            message.reply(`${joined} ${message.member.voiceChannel.name}`);
        });
    }
}
