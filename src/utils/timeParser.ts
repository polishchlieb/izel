// 7 * 86400 * 1000
const limit: number = 604800000;

export default (time: string): boolean | number => {
    if(!/[0-9]+(?=s|m|h|d)/g.test(time))
        return false;

    const parsed: string[] = time.match(/[0-9]+|(s|m|h|d)/g);
    let parsedTime: number = parseInt(parsed[0]);

    switch(parsed[1]) {
        case 's': parsedTime = parsedTime * 1000; break;
        case 'm': parsedTime = parsedTime * 60000; break;
        case 'h': parsedTime = parsedTime * 3600000; break;
        case 'd': parsedTime = parsedTime * 86400000; break;
    }

    return (parsedTime > limit && limit != -1 || parsedTime < 10000) ? false : parsedTime;
}
