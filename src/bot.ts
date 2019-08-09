import { Client } from 'discord.js'
import {
    loadCommands, loadEvents, loadDashboard, loadPlayer, loadClickrole
} from './utils/loader';

import Command from './interfaces/command';
import Event from './interfaces/event';
import { MongoClient, Collection, Db as Database } from 'mongodb';
import {
    StatUser, Server, Permission,
    Tag, User, Channel, ClickRole
} from './interfaces/databaseStructures';
import { Player } from './interfaces/player';

export default class Bot {
    client: Client = new Client({ disableEveryone: true });
    commands: Command[] = [];
    events: Event[] = [];

    // TODO: Create 'db' property here
    stats: Collection<StatUser>;
    users: Collection<User>;
    servers: Collection<Server>;
    permissions: Collection<Permission>;
    tags: Collection<Tag>;
    channels: Collection<Channel>;
    clickRole: Collection<ClickRole>;
    
    player: Player;

    async start(token: string): Promise<void> {
        process.on('unhandledRejection', console.error);

        let conn: MongoClient = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        let database: Database = conn.db('izel');
        
        this.stats = database.collection('stats');
        this.users = database.collection('users');
        this.servers = database.collection('servers');
        this.permissions = database.collection('permissions');
        this.tags = database.collection('tags');
        this.channels = database.collection('channels');
        this.clickRole = database.collection('clickRole');

        this.player = {};

        loadEvents(this);
        loadCommands(this);
        loadDashboard();

        await this.client.login(token);
        loadPlayer(this);
        loadClickrole(this);
    }
}
