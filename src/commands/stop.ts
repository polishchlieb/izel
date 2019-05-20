// import Command from '../interfaces/command';
// import { Message } from 'discord.js';
// import bot from '..';

// export default class StopCommand implements Command {
//     info = {
//         names: ['stop'],
//         description: 'Stops playing',
//         usage: '&stop'
//     }

//     run(message: Message, args: string[], messages: any): any {
//         let server = bot.music[message.guild.id];
//         if(server.dispatcher) {
//             server.dispatcher.end();
//             message.reply(messages.skipped);
//         } else message.reply(messages.notPlaying);
//     }
// }