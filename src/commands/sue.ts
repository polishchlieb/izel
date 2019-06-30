import Command from "../interfaces/command";
import { Message, CollectorFilter, MessageCollector, RichEmbed } from "discord.js";
import Messages from "../interfaces/messages";

export default class SueCommand implements Command {
    info = {
        names: ['sue', 'pozwij'],
        description: 'finally you can sue someone',
        usage: 'sue',
        category: 'games'
    }

    run(message: Message, []: string[], messages: Messages) {
        message.reply(messages.sueMention);

        const messageFilter: CollectorFilter = (m: Message) => m.author.id == message.author.id;

        message.channel.createMessageCollector(messageFilter, { time: 180000 }).once('collect', (m: Message) => {
            if (m.mentions.members.first()) {
                const sued = m.mentions.members.first();
                message.reply(messages.sueQuestion)

                message.channel.createMessageCollector(messageFilter, { time: 180000 }).once('collect', (m: Message) => {
                    const reason = m.content;
                    const confirmationEmbed = new RichEmbed()
                    .setAuthor(messages.sue, 'https://nczas.com/wp-content/uploads/2019/04/sedzia_anna_maria_wesolowska_nczas-696x464.jpg')
                    .setColor('RANDOM')
                    .setTitle(`${messages.sueConfirmationSued} ${sued.user.username}`)
                    .setDescription(`${messages.sueConfirmationReason}: ${reason}`)
                    .setFooter(`${messages.sueConfirmationQuestion}`)

                    message.channel.send(confirmationEmbed)

                    message.channel.createMessageCollector(messageFilter, { time: 180000 }).once('collect', (m: Message) => {
                        const ans = m.content.toLowerCase()
                        if(ans == 'tak' || ans == 't' || ans == 'y' || ans == 'yes') {
                            const suedEmbed = new RichEmbed()
                            .setAuthor(messages.sue, 'https://nczas.com/wp-content/uploads/2019/04/sedzia_anna_maria_wesolowska_nczas-696x464.jpg')
                            .setColor('RANDOM')
                            .setTitle(`${messages.sued} ${message.author.username}`)
                            .setDescription(`${messages.sueConfirmationReason}: ${reason}`)

                            message.channel.send(`${messages.sueConfirmed} ${sued.user.username}`);
                            sued.user.send(suedEmbed)
                        }
                    })
                })

            } else {
                message.channel.send(messages.sueCancelled)
            }
        })
    }
}