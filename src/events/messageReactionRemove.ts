import { MessageReaction, User, GuildMember } from 'discord.js';
import Event from '../interfaces/event';
import { ClickRole } from '../interfaces/databaseStructures';
import bot from '..';

export default class MessageReactionAddEvent implements Event {
    name = 'messageReactionRemove';

    async run(reaction: MessageReaction, user: User): Promise<void> {
    }
}
