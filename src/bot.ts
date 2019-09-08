import { Client } from 'discord.js'
import Loader from './utils/loader';

import Command from './interfaces/command';
import Event from './interfaces/event';
import { MongoClient, Collection, Db } from 'mongodb';
import {
    StatUser, Server, Permission,
    Tag, User, Channel, Clickrole
} from './interfaces/databaseStructures';
import { Player } from './interfaces/player';

const { mongoURI }: { mongoURI: string } = require('../config.json');

export default class Bot {
    public client: Client = new Client({ disableEveryone: true });
    public commands: Command[] = [];
    public events: Event[] = [];

    public stats: Collection<StatUser>;
    public users: Collection<User>;
    public servers: Collection<Server>;
    public permissions: Collection<Permission>;
    public tags: Collection<Tag>;
    public channels: Collection<Channel>;
    public clickrole: Collection<Clickrole>;
    
    public player: Player;

    public async start(token: string): Promise<void> {
        process.on('unhandledRejection', console.error);

        let conn: MongoClient = await MongoClient.connect(mongoURI, { useNewUrlParser: true });
        let database: Db = conn.db('izel');
        
        this.stats = database.collection('stats');
        this.users = database.collection('users');
        this.servers = database.collection('servers');
        this.permissions = database.collection('permissions');
        this.tags = database.collection('tags');
        this.channels = database.collection('channels');
        this.clickrole = database.collection('clickRole');

        this.player = {};

        await this.client.login(token);
        
        const loader: Loader = new Loader();
        loader.load();
    }
}
