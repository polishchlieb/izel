import Command from '../interfaces/command';
import { Message } from 'discord.js';
import { exec, ExecException } from 'child_process';

export default class ExecCommand implements Command {
    info = {
        names: ['exec'],
        description: 'Executes shell command',
        usage: '&exec (command..)',
        category: 'developer'
    }

    run(message: Message, args: string[], messages: any): any {
        if(message.author.id != '372459063339909120')
            return message.reply(messages.noPermission);

        exec(args.join(' '), (err: ExecException, stdout: string, stderr: string): void => {
            if(err) message.channel.send(`error: \`${err}\``);

            if(stdout) message.channel.send(`stdout: \`${stdout}\``);
            if(stderr) message.channel.send(`stderr: \`${stderr}\``);
        });
    }
}