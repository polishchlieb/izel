const greetings: string[] =
['hello', 'hi', 'czesc', 'cześć', 'siema', 'witaj', 'witam',
 'witajże', 'witajze', '<@470345804075237396>', 'izel',
 'dzień dobry', 'dzien dobry', 'dziendobry', 'dzieńdobry',
 'hail', 'halt', 'priviet', 'priwiet', 'halo', 'aloha',
 'ahoj', 'elo', 'hej', 'szczęść boże', 'szczesc boze',
 'z bogiem'];

export default (content: string): boolean => {
    content = content.toLowerCase();
    return greetings.some((g: string): boolean => content.includes(g));
}