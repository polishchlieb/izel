import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';
import * as cookie from 'cookie-parser';
import Bot from '../bot';
import { GuildMember, Guild } from 'discord.js';

const router: Router = Router();
const { id, secret, callback }: { id: string, secret: string, callback: string} = require("../../config.json");
const redirect: string = encodeURIComponent(callback);

interface BotRequest extends Request {
    bot: Bot
}

// logging in things
router.get('/login', (req: Request, res: Response) => {
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${id}&redirect_uri=${redirect}&response_type=code&scope=identify guilds`);
});

router.get('/callback', (req: Request, res: Response) => {
    if (!req.query.code) throw new Error('NoCodeProvided');

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
    .then(resp => resp.json())
    .then(data => {
        res.cookie('token', data.access_token, {
            // 1000 (ms) * 60 (s) * 60 (min) * 24 (h) * 3 (d) => 3 days
            maxAge: 259200000
        });
        res.redirect('/');
    });
});

router.use(cookie())

router.get('/logout', (req: Request, res: Response) => {
    fetch(`https://discordapp.com/api/oauth2/token/revoke?token=${req.cookies.token}`,
    {
        method: 'post',
        headers: {
            'User-Agent': 'Discord-Bot Izel'
        }
    })
    res.clearCookie('token');
    res.redirect('/');
})

// checking authorization
router.get('/check', (req: BotRequest, res: Response) => {
    if(req.cookies.token === null || req.cookies.token === undefined) {
        res.status(401);
        return res.send({ status: 'ERROR', message: 'No authorization token' });
    }

    fetch('https://discordapp.com/api/users/@me', {
            headers: {
                'Authorization': "Bearer "+req.cookies.token
            }
        })
    .then(resp => resp.json())
    .then(data => {
        res.status(200)
        return res.send({
            status: "OK",
            message: "Logged in",
            data,
            guilds: req.bot.client.guilds.size,
            users: req.bot.client.users.size
        })
    })
    .catch(function() {
        res.status(401)
        res.clearCookie('token')
        return res.send({
            status: "ERROR",
            message: "Not logged in"
        })
    })
})

// fetching user data things
router.get('/getId', (req: Request, res: Response) => {
    fetch('https://discordapp.com/api/users/@me',
        {
            headers: {
                'Authorization': `Bearer ${req.cookies.token}`,
                'User-Agent': 'Discord-Bot Izel'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            res.send(data)
        })
        .catch(err => res.send(new Error(err.message)));
});

router.get('/guilds', (req: BotRequest, res: Response) => {
    fetch('https://discordapp.com/api/users/@me/guilds', {
        headers: {
            'Authorization': 'Bearer '+req.cookies.token,
            'User-Agent': 'Discord-Bot Izel'
        }
    })
    .then(resp => resp.json())
    .then(data => {
        let matches: Array<{ owner: String, permissions: Number, icon: String, id: String, name: String}> = [];
        data.forEach(guild => {
            if (req.bot.client.guilds.get(guild.id)) {
                matches.push(guild);
            }
        })
        
        res.send(matches);
    });
});

router.get('/guild', (req: BotRequest, res: Response) => {
    fetch('https://discordapp.com/api/users/@me',
        {
            headers: {
                'Authorization': `Bearer ${req.cookies.token}`,
                'User-Agent': 'Discord-Bot Izel'
            }
        })
        .then(resp => resp.json())
        .then(user => {
            let Tguild: Guild = req.bot.client.guilds.get(req.query.guild);

            req.bot.database.collection(req.query.guild)
                .find()
                .sort({ messages: -1 })
                .limit(10)
                .toArray()
                .then(guild => {
                    let result: any[] = [];

                    guild.forEach((user: any, i: number) => {
                        let member: GuildMember = Tguild.member(user.id);
                        if(member) {
                            result.push({
                                id: member.id,
                                tag: member.user.tag,
                                av: `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}?size=128`,
                                messages: user.messages,
                                level: user.level
                            });
                        }
                    })

                res.send({
                    top: result,
                    guildName: Tguild.name,
                    userID: user.id
                });
            })
        })
        .catch(err => res.send(new Error(err.message)));
});

export default router;