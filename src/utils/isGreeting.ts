const greetings: string[] =
['hello', 'hi', 'czesc', 'cześć', 'siema', 'witaj', 'witam',
 'witajże', 'witajze', '<@470345804075237396>', 'izel',
 'dziendobry', 'dzieńdobry', 'hail', 'halt', 'priviet', 
 'priwiet', 'halo', 'aloha','ahoj', 'elo', 'hej', 'dobry wieczór', 'dobry wieczor',
 'hejka', 'heja', 'siemka', 'eluwa', 'serwus', 'siemano', 'siemaneczko', 'wiataj'];

export default (content: string): boolean => {
    content = content.toLowerCase();
    let args: string[] = content.toLowerCase().split(' ');
    return greetings.some((g: string): boolean => args.includes(g))
      || content.includes('dzień dobry') || content.includes('szczesc boze')
      || content.includes('z bogiem') || content.includes('szczęść boże')
      || content.includes('dzien dobry')
      || content.includes('dobry wieczór')
      || content.includes('dobry wieczor');
}