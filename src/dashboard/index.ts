import * as e from 'express';
import { join } from 'path';
import { magenta } from 'colors';
import { Bot } from '../bot';
import api from './api';

export class Dashboard {
    app:e.Express = e();
    bot: Bot;

    constructor(bot: Bot) {
        this.bot = bot;
    }
    
    init(): void {
        this.app.use(e.static(join(__dirname, "public")))

        // routes
        this.app.get('/', (req: e.Request, res: e.Response) => {
            res.sendFile(join(__dirname, './public/index.html'))
        })
        
        this.app.get('/dashboard', (req: e.Request, res: e.Response) => {
            res.sendFile(join(__dirname, './public/index.html'))
        })

        this.app.use('/api', (req: (e.Request | any), res: e.Response, next: e.NextFunction) => {
            req.bot = this.bot;
            next();
        }, api)

        console.log(magenta("Loaded dashboard\n"))
    }

    start(): void {
        this.app.listen(8090);
    }
}