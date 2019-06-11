import bot from "..";
import fetch from "node-fetch";

export const getSongs = async(query: string): Promise<any> => {
    const node = bot.player.nodes[0];
    const params = new URLSearchParams();
    params.append("identifier", query);

    return fetch(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`,
        {
            headers: { Authorization: node.password }
        })
        .then(resp => resp.json())
        .then(data => data.tracks)
}