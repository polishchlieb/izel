import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';
import * as cookie from 'cookie-parser';
import { Bot } from "../bot";
import { GuildMember, Guild, MessageMentions } from 'discord.js';

const router: Router = Router();
const { id, secret, callback }: { id: string, secret: string, callback: string} = require("../../config.json");
const redirect: string = encodeURIComponent(callback);

interface BotRequest extends Request {
    bot: Bot
}
// logging in things
router.get('/login', (req: Request, res: Response) => {
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${id}&redirect_uri=${redirect}&response_type=code&scope=identify guilds`);
})

router.get('/callback', (req: Request, res: Response) => {
    if (!req.query.code) throw new Error("NoCodeProvidd");

    const code: string = req.query.code;
    const creds = Buffer.from(`${id}:${secret}`).toString('base64');

    fetch(
        `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
        {
            headers: {
                'Authorization': `Basic ${creds}`,
                'User-Agent': 'Discord-Bot Izel'
            },
            method: 'post'
        }
    )
    .then(resp => resp.json())
    .then(data => {
        res.cookie('token', data.access_token, {
            maxAge: 1000 * 60 * 60 * 24 * 3
        });
        res.redirect('/')
    })
})

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
        res.status(401)
        return res.send({ status: "ERROR", message: "No authorization token"})
    }

    fetch("https://discordapp.com/api/users/@me", {
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
        .catch(err => res.send(new Error(err.message)))
})

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
        
        res.send(matches)

    })
})

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
            let userId: string = user.id;
            let Tguild: Guild = req.bot.client.guilds.get(req.query.guild);

            req.bot.database.collection(req.query.guild)
            .find()
            .sort({ messages: -1 }).toArray()
            .then(guild => {
                console.dir(guild);
                let result: any[] = [];

                guild.forEach((user: any, i: number) => {
                    let member: GuildMember = Tguild.member(user.id);
                    if(member) {
                        result.push({
                            i: i+1,
                            id: member.id,
                            name: member.user.username,
                            dsc: member.user.discriminator,
                            av: `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}?size=128`,
                            messages: user.messages
                        })
                    }
                })

                let rank = result.find(x => x.id == userId);
                res.send({
                    top: result,
                    rank,
                    guildName: Tguild.name
                });
            })
        })
        .catch(err => res.send(new Error(err.message)))
})

export default router;