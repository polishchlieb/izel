import { GuildMember, Guild } from 'discord.js';
import { Request, Response, Router } from 'express';
import * as bodyParser from 'body-parser';
import fetch from 'node-fetch';
import * as cookie from 'cookie-parser';

import bot from '..';
import Command from '../interfaces/command';
import { StatUser } from '../interfaces/databaseStructures';
import { json } from 'express';

const router: Router = Router();
const { id, secret, dashboard }: { id: string, secret: string, dashboard: string }
    = require('../../config.json');
const redirect: string = encodeURIComponent(dashboard+'/api/callback');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookie());

router.get('/login', (req: Request, res: Response): void => {
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${id}&redirect_uri=${redirect}&response_type=code&scope=identify guilds`);
});

router.get('/callback', (req: Request, res: Response): any => {
    if (!req.query.code)
        return res.send('do you are have stupid');

    const code: string = req.query.code;
    const creds: string = Buffer.from(`${id}:${secret}`).toString('base64');

    fetch(
        `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
        {
            headers: {
                'Authorization': `Basic ${creds}`,
                'User-Agent': 'Discord-Bot izel'
            },
            method: 'post'
        }
    )
    .then((resp): Promise<any> => resp.json())
    .then((data: any): void => {
        res.cookie('token', data.access_token, {
            // 1000 (ms) * 60 (s) * 60 (min) * 24 (h) * 3 (d) => 3 days
            maxAge: 259200000
        });
        res.redirect('/');
    });
});

router.get('/logout', (req: Request, res: Response): void => {
    fetch(`https://discordapp.com/api/oauth2/token/revoke?token=${req.cookies.token}`,
    {
        method: 'post',
        headers: {
            'User-Agent': 'Discord-Bot Izel'
        }
    });

    res.clearCookie('token');
    res.redirect('/');
});

router.get('/check', (req: Request, res: Response): any => {
    if(!req.cookies.token) {
        res.status(401);
        return res.send({ status: 'ERROR', message: 'No authorization token' });
    }

    fetch('https://discordapp.com/api/users/@me', {
        headers: {
            'Authorization': `Bearer ${req.cookies.token}`
        }
    })
        .then((resp): Promise<any> => resp.json())
        .then((data: any): void => {
            res.status(200)
            res.send({
                status: 'OK',
                message: 'Logged in',
                data,
                guilds: bot.client.guilds.size,
                users: bot.client.users.size
            });
        })
        .catch((): void => {
            res.status(401);
            res.clearCookie('token');
            res.send({
                status: 'ERROR',
                message: 'Not logged in'
            });
        });
});

router.get('/getId', (req: Request, res: Response): void => {
    fetch('https://discordapp.com/api/users/@me',
        {
            headers: {
                'Authorization': `Bearer ${req.cookies.token}`,
                'User-Agent': 'Discord-Bot Izel'
            }
        })
        .then((resp): Promise<any> => resp.json())
        .then((data: any): void => {
            res.send(data)
        })
        .catch((err: Error) => res.send(new Error(err.message)));
});

router.get('/guilds', (req: Request, res: Response): void => {
    fetch('https://discordapp.com/api/users/@me/guilds', {
        headers: {
            'Authorization': `Bearer ${req.cookies.token}`,
            'User-Agent': 'Discord-Bot Izel'
        }
    })
    .then((resp): Promise<any> => resp.json())
    .then((data: any[]): any => {
        let matches: any[] = [];
        data.forEach((guild: any): void => {
            if (bot.client.guilds.get(guild.id)) {
                matches.push(guild);
            }
        });

        res.send({
            guilds: matches,
        });
    });
});

router.get('/guild', async (req: Request, res: Response): Promise<void> => {
    let user = await fetch('https://discordapp.com/api/users/@me',
    {
        headers: {
            'Authorization': `Bearer ${req.cookies.token}`,
            'User-Agent': 'Discord-Bot Izel'
        }
    })
        .then((resp): Promise<any> => resp.json())

    let Tguild: Guild = bot.client.guilds.get(req.query.guild);

    bot.stats.find({ guild: Tguild.id }).sort({ points: -1 }).limit(20).toArray()
        .then((guild: any[]): void => {
            let result: any[] = [];

            let ii = 0;
            guild.forEach((user: StatUser): void => {
                let member: GuildMember = Tguild.member(user.id);
                if(member) {
                    ii++;
                    if(ii > 25) return;

                    result.push({
                        id: member.id,
                        tag: member.user.username,
                        av: `${member.user.displayAvatarURL}?size=128`,
                        points: user.points,
                        level: user.level
                    });
                }
            });

            res.send({
                id: Tguild.id,
                top: result,
                guildName: Tguild.name,
                userID: user.id,
                icon: Tguild.iconURL,
                admin: Tguild.member(user.id).hasPermission('ADMINISTRATOR')
            });
        });
});
// SELFROLES
router.get('/roles', async (req: Request, res: Response): Promise<any> => {
    if(!req.query.guild || !req.query.id) return res.status(400).send({ err: "no guild"});
    try {
        let guild = await bot.servers.findOne({ id: req.query.guild });
        let resp = [];
        await guild.selfCategories.forEach(category => {
            resp.push({ name: category, roles: [] })
        })
        await guild.selfroles.forEach(async role => {
            try {
                let member = await bot.client.guilds.get(req.query.guild).fetchMember(req.query.id);
                if(member.roles.get(role.id)) {
                    role.user = true;
                    await resp.find(cat => cat.name == role.category).roles.push(role);
                } else {
                    role.user = false;
                    await resp.find(cat => cat.name == role.category).roles.push(role);
                }
            } catch {
                res.status(300).send({ err: "oopsie" });                
            } finally {
                await res.send(resp);
            }
        })
    } catch(e) {
        res.status(300).send({ err: e });
    }
})

router.use(json())

router.post('/roles', async (req: Request, res: Response): Promise<any> => {
    if (!req.body.guild || !req.body.role ) return res.status(400).send({ err: "no guild" });
    let user = await fetch('https://discordapp.com/api/users/@me', {
        headers: {
            'Authorization': `Bearer ${req.cookies.token}`,
            'User-Agent': 'Discord-Bot Izel'
        }
    })
    .then((resp): Promise<any> => resp.json())
    try {
        let guild = await bot.servers.findOne({ id: req.body.guild });
        let role = guild.selfroles.find(role => role.id == req.body.role )
        if(!role) {
            return res.status(400).send({ err: "nice try" });
        }
        let member = await bot.client.guilds.get(req.body.guild).fetchMember(user.id);
        if(member.roles.get(role.id)) {
            member.removeRole(role.id)
            .then(() => res.send({added: false}))
            .catch((e) => res.status(300).send(e));
        } else {
            member.addRole(role.id)
            .then(() => res.send({added: true}))
            .catch((e) => res.status(300).send(e));
        }
    } catch(e) {
        res.status(300).send({ err: e });
    }
})

// settings
router.get('/admin', async (req: Request, res: Response): Promise<any> => {
    if (!req.query.guild) return res.status(400).send({ err: "no guild" });
    let user = await fetch('https://discordapp.com/api/users/@me', {
        headers: {
            'Authorization': `Bearer ${req.cookies.token}`,
            'User-Agent': 'Discord-Bot Izel'
        }
    })
    .then((resp): Promise<any> => resp.json());

    try {
        let guild = await bot.servers.findOne({ id: req.query.guild });
        let member = await bot.client.guilds.get(guild.id).fetchMember(user.id);
        if(member.hasPermission("ADMINISTRATOR")) {
            let server = bot.client.guilds.get(guild.id);
            let botuser = await server.fetchMember(bot.client.user.id);
            const aroles = server.roles.filter(role => role.position < botuser.highestRole.position)
            .map(k => { return {
                id: k.id,
                name: k.name,
                pos: k.position,
                color: k.hexColor
            }});
            aroles.forEach(role => {
                if(role.color == '#000000') role.color = '#ffffff';
            })

            aroles.sort((a, b) => b.pos - a.pos);
            const channels = server.channels
            .filter(channel => channel.type == "text")
            .map(k => { return { 
                id: k.id, 
                name: k.name, 
                pos: k.position
            }})
            let autoroleData = { id: "", name: "", color: "" };
            const autorole = await server.roles.get(guild.autorole);
            if(autorole) {
                autoroleData.name = autorole.name;
                autoroleData.id = autorole.id;
                autoroleData.color = autorole.hexColor;
            } 

            let clickroles = [];
            if(guild.selfCategories) {
                await guild.selfCategories.forEach(category => {
                    clickroles.push({ name: category, roles: [] })
                })

                await guild.selfroles.forEach(async role => {
                    try {
                        await clickroles.find(cat => cat.name == role.category).roles.push(role);
                    } catch {
                        res.status(300).send({ err: "oopsie" });
                    }
                })
            }

            await res.send({
                autorole: autoroleData,
                greeting: guild.greeting,
                goodbye: guild.goodbye,
                selfroles: clickroles,
                roles: aroles,
                channels
            })
            // do zwrócenia: (autorole, greeting, goodbye, selfroles), role dostępne, kanały dostępne
        } else {
            res.sendStatus(403);
        }
    } catch(e) {
        res.status(300).send({ err: e });
    }
})

router.post('/admin', async (req: Request, res: Response): Promise<any> => {
    if (!req.body.action || !req.body.value || !req.body.guild) return res.status(400).send({ err: "no guild" });
    let user = await fetch('https://discordapp.com/api/users/@me', {
        headers: {
            'Authorization': `Bearer ${req.cookies.token}`,
            'User-Agent': 'Discord-Bot Izel'
        }
    })
    .then((resp): Promise<any> => resp.json());

    try {
        let guild = await bot.servers.findOne({ id: req.body.guild });
        let member = await bot.client.guilds.get(guild.id).fetchMember(user.id);
        if (member.hasPermission("ADMINISTRATOR")) {
            let server = await bot.client.guilds.get(guild.id);
            if(req.body.action.id == 'autorole') {
                if(req.body.action.name == 'set') {
                    let role = server.roles.get(req.body.value);
                    if (role) {
                        bot.servers.updateOne({ id: guild.id }, {
                            $set: {
                                autorole: req.body.value
                            }
                        })
                        res.send({ ok: 'set' })
                    }
                } else if (req.body.action.name == 'remove') {
                    bot.servers.updateOne({ id: guild.id }, {
                        $set: {
                            autorole: null
                        }
                    })
                    res.send({ ok: 'remvd'})
                }
            } else if (req.body.action.id == 'welcome') {

            } else if (req.body.action.id == 'goodbye') {

            } else if (req.body.action.id == 'selfrole') {
                if(req.body.action.name == "addRole") {
                    guild.selfroles.push({ id: req.body.value.role.id, name: req.body.value.role.name, color: req.body.value.role.color, category: req.body.value.category, pos:0, user: null});
                    bot.servers.updateOne({id: guild.id}, { $set: guild })
                    res.send({ok: 'set'});
                } else if (req.body.action.name == "addCat") {
                    if (!guild.selfCategories) guild.selfCategories = [];
                    if (!guild.selfroles) guild.selfroles = [];
                    guild.selfCategories.push(req.body.value);
                    bot.servers.updateOne({ id: guild.id }, { $set: guild })
                    res.send({ ok: 'set' });
                } else if (req.body.action.name == "removeRole") {
                    guild.selfroles = guild.selfroles.filter(role => role.id != req.body.value)
                    bot.servers.updateOne({ id: guild.id }, { $set: guild })
                    res.send({ ok: 'set' });
                } else if (req.body.action.name == "removeCat") {
                    guild.selfCategories = guild.selfCategories.filter(cat => cat != req.body.value);
                    guild.selfroles = guild.selfroles.filter(role => role.category != req.body.value);
                    bot.servers.updateOne({ id: guild.id }, { $set: guild })
                    res.send({ ok: 'set' });
                }
            }
        } else {
            res.sendStatus(403);
        }
    } catch(e) {
        res.status(300).send({ err: e });
    }
})
// other
let commands: Command['info'][];
router.get('/commands', (req: Request, res: Response): void => {
    if(!commands)
        commands = bot.commands.map(c => c.info);
    res.send(commands);
});

const { radios } = require('../../radios.json');
router.get('/radios', (req: Request, res: Response): void => {
    res.send(radios);
});

/*router.post('/admin', (req: Request, res: Response): void => {
    fetch('https://discordapp.com/api/users/@me',
    {
        headers: {
            'Authorization': `Bearer ${req.cookies.token}`,
            'User-Agent': 'Discord-Bot Izel'
        }
    })
    .then((resp): Promise<any> => resp.json())
    .then((user: any): any => {
        let Tguild: Guild = bot.client.guilds.get(req.query.guild);
        if(!Tguild.member(user.id) || !Tguild.member(user.id).hasPermission('ADMINISTRATOR') || !req.body.prefix)
            return res.send('do you are have stupid');

        bot.servers.updateOne({ id: Tguild.id }, {
            $set: {
                prefix: req.body.prefix,
                language: req.body.language == 'polski' ? 'pl' : 'en'
            }
        });
    })
    .catch((err: Error): void => {
        res.send(new Error(err.message))
    });
});*/

export default router;