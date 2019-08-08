import { MessageReaction, User, GuildMember } from 'discord.js';
import Event from '../interfaces/event';
import { ClickRole } from '../interfaces/databaseStructures';
import bot from '..';

export default class MessageReactionAddEvent implements Event {
    name = 'messageReactionRemove';

    async run(reaction: MessageReaction, user: User): Promise<void> {
        let clickrole: ClickRole = await bot.clickRole.findOne({ message: reaction.message.id });
        if(clickrole) {
            let member: GuildMember = reaction.message.guild.member(user);
            if(!member) return;

            let test: string = reaction.emoji.id || reaction.emoji.toString();
            let role: string = clickrole.roles.find(
                ([ emoji ]: [string, string]): boolean => 
                    emoji == test
            )[1];
            member.removeRole(role);
        }
    }
}
