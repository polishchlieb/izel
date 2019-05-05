import { Client } from 'discord.js'
import { loadCommands, loadEvents, loadDashboard } from './utils/loader';
import Command from './interfaces/command';
import Event from './interfaces/event';
import { Db, MongoClient } from 'mongodb';
import bot from '.';

export default class Bot {
    client: Client = new Client();
    commands: Command[] = [];
    events: Event[] = [];
    database: Db;

    async start(token: string): Promise<void> {
        process.on('unhandledRejection', console.error);

        let conn: MongoClient = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });

        bot.database = conn.db('izel');
        loadEvents(this);
        loadCommands(this);
        loadDashboard(this);

        this.client.login(token);
    }
}