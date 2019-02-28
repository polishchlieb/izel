import { Client } from 'discord.js'
import { Command } from './interfaces/command';
import { loadCommands, loadEvents } from './utils/loader';
import { Event } from './interfaces/event';
import { GuildDataHandler } from './utils/guildDataHandler';

export class Bot extends GuildDataHandler {
    client: Client;
    commands: Command[];
    events: Event[];

    start(token: string) {
        this.initGuildData();
        this.commands = [];
        this.events = [];

        this.client = new Client();
        this.client.login(token);

        process.on('unhandledRejection', err => {
            console.log(err);
        });

        loadEvents(this);
        loadCommands(this);
    }
}