import { Client } from 'discord.js'
import { loadCommands, loadEvents } from './utils/loader';
import { Command } from './interfaces/command';
import { Event } from './interfaces/event';

export class Bot {
    client: Client = new Client();
    commands: Command[] = [];
    events: Event[] = [];

    start(token: string) {
        this.client.login(token);

        process.on('unhandledRejection', err => {
            console.log(err);
        });

        loadEvents(this);
        loadCommands(this);
    }
}