import bot from '..';
import fetch, { Response } from 'node-fetch';
import { URLSearchParams } from 'url';

export const getSongs = async (query: string): Promise<any> => {
    const { host, port, password } = bot.player.nodes[0];
    const params: URLSearchParams = new URLSearchParams;
    params.append('identifier', query);

    return await fetch(`http://${host}:${port}/loadtracks?${params.toString()}`,
        {
            headers: { Authorization: password }
        }
    )
        .then((resp: Response): Promise<any> => resp.json())
        .then((data: any): any => data.tracks);
}