import Event from '../interfaces/event';
import { Clickrole } from '../interfaces/databaseStructures';
import bot from '..';
import { Guild } from 'discord.js';

export default class RawEvent implements Event {
    name = 'raw';

    async run({ d, t }: { d: any, t: string }): Promise<void> {
        if(t != 'MESSAGE_REACTION_ADD' && t != 'MESSAGE_REACTION_REMOVE')
            return;
        if(d.user_id == bot.client.user.id)
            return;

        let clickrole: Clickrole = await bot.clickrole.findOne({
            message: d.message_id
        });
        if(!clickrole) return;

        let guild: Guild = bot.client.guilds.get(d.guild_id);
        let role: any = clickrole.roles[d.emoji.id || d.emoji.name];

        if(role) guild.member(d.user_id)[
            t == 'MESSAGE_REACTION_ADD' ? 'addRole' : 'removeRole'
        ](role);
    }
}
