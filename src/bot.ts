import { Client } from 'discord.js'
import { Command } from './interfaces/command';
import { loadCommands, loadEvents } from './loader';
import { Event } from './interfaces/event';

export class Bot {
    client: Client;
    commands: Command[];
    events: Event[];

    start(token: string) {
        this.commands = [];
        this.events = [];

        this.client = new Client();
        this.client.login(token);

        loadEvents(this);
        loadCommands(this);
    }
}