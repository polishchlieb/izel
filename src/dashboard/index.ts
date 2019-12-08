import * as e from 'express';
import { join } from 'path';
import api from './api';

export default class Dashboard {
    app: e.Express = e();
    
    constructor() {
        this.init();
        this.start();
    }

    init(): void {
        this.app.use(e.static(join(__dirname, 'public')));

        this.app.get('/', (req: e.Request, res: e.Response): void => {
            res.sendFile(join(__dirname, './public/index.html'));
        });

        this.app.get('/dashboard', (req: e.Request, res: e.Response): void => {
            res.sendFile(join(__dirname, './public/index.html'));
        });

        this.app.get('/commands', (req: e.Request, res: e.Response): void => {
            res.sendFile(join(__dirname, './public/index.html'));
        });

        this.app.get('/radios', (req: e.Request, res: e.Response): void => {
            res.sendFile(join(__dirname, './public/index.html'));
        });

        this.app.get('/ranking/:ss', (req: e.Request, res: e.Response): void => {
            res.sendFile(join(__dirname, './public/index.html'));
        });

        this.app.use('/api', (req: any, res: e.Response, next: e.NextFunction) => {
            next();
        }, api);
    }

    start(): void {
        if(process.env.NODE_ENV == 'production') this.app.listen(80);
        else this.app.listen(8090);
    }
}