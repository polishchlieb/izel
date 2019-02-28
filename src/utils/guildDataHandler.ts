import { writeFileSync, readFileSync } from 'fs';

export class GuildDataHandler {
    fileLocation = 'data/guildInfo.json';
    guildData: {[k: string]: any} = {};

    initGuildData() {
        this.guildData = JSON.parse(readFileSync(this.fileLocation).toString());
    }

    setGuildData(guild_id: string, data: {[k: string]: any}) {
        this.guildData[guild_id] = data;
        writeFileSync(this.fileLocation, JSON.stringify(this.guildData));
    }

    save() {
        writeFileSync(this.fileLocation, JSON.stringify(this.guildData));
    }
}