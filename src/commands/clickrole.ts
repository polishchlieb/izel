// import Command from '../interfaces/command';
// import { Message, MessageCollector } from 'discord.js';
// import Messages from '../interfaces/messages';

// export default class ClickroleCommand implements Command {
//     info = {
//         names: ['clickrole'],
//         description: 'Creates a clickrole message',
//         usage: '&clickrole',
//         category: 'tool'
//     };

//     run(message: Message, []: string[], messages: Messages): void {
//         message.channel.send(messages.clickRoleStart);

//         const collector: MessageCollector = message.channel.createMessageCollector(
//             (m: Message): boolean => m.author.id == message.author.id,
//             { time: 900000 } // 15 minutes (probably)
//         );
//         let roles;

//         collector.on('collect', (m: Message): void => {
//             if(m.content == 'papryka')
//                 return collector.stop();

//             roles.push()

            
//         });
//     }
// }