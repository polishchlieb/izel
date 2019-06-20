import Command from '../interfaces/command';
import { Message } from 'discord.js';
import { exec, ExecException } from 'child_process';
import Messages from '../interfaces/messages';
const { developerMode } = require('../../config.json');

export default class ExecCommand implements Command {
    info = {
        names: ['exec'],
        description: 'Executes shell command',
        usage: '&exec (command..)',
        category: 'developer'
    };

    run(message: Message, args: string[], { noPermission }: Messages): any {
        if(!developerMode) return;
        
        if(message.author.id != '372459063339909120')
            return message.reply(noPermission);

        exec(args.join(' '), (err: ExecException, stdout: string, stderr: string): void => {
            if(err) message.channel.send(`error: \`${err}\``);

            if(stdout) message.channel.send(`stdout: \`${stdout}\``);
            if(stderr) message.channel.send(`stderr: \`${stderr}\``);
        });
    }
}