import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';
import * as cookie from 'cookie-parser';
import bot from '..';
import { GuildMember, Guild } from 'discord.js';
import * as bodyParser from 'body-parser';

const router: Router = Router();
const { id, secret, callback }: { id: string, secret: string, callback: string } = require('../../config.json');
const redirect: string = encodeURIComponent(callback);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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

router.use(cookie());

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
        .then((data: any[]): void => {
            let matches: any[] = [];

            data.forEach((guild: any): void => {
                if (bot.client.guilds.get(guild.id))
                    matches.push(guild);
            });

            res.send(matches);
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

    bot.stats.find({ guild: Tguild.id }).sort({ messages: -1 }).limit(10).toArray()
        .then((guild: any[]): void => {
            let result: any[] = [];

            guild.forEach((user: any): void => {
                let member: GuildMember = Tguild.member(user.id);
                if(member) {
                    result.push({
                        id: member.id,
                        tag: member.user.tag,
                        av: `${member.user.displayAvatarURL}?size=128`,
                        messages: user.messages,
                        level: user.level
                    });
                }
            });

            res.send({
                id: Tguild.id,
                top: result,
                guildName: Tguild.name,
                userID: user.id,
                admin: Tguild.member(user.id).hasPermission('ADMINISTRATOR') ?
                    bot.servers.findOne({ id: Tguild.id }) : null
            });
        });
});

router.get('/commands', (req: Request, res: Response): void => {
    res.send(bot.commands.map(c => c.info));
});

router.post('/admin', (req: Request, res: Response): void => {
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
});

export default router;