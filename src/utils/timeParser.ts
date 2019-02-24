// https://gist.github.com/polishchlieb/966457040e9788050eb3becc66612f44

const limit = 7 * 86400;

const factors = ['s', 'm', 'h', 'd'];

export function parseTime(time: string) {
    const factor = time.slice(-1);
    if(!factors.includes(factor.toLocaleLowerCase()))
        return false;

    const parsedTime = parseInt(time);
    if(isNaN(parsedTime) || parsedTime < 0)
        return false;

    let parsedSeconds;
    if(factor == 's') parsedSeconds = parsedTime;
    if(factor == 'm') parsedSeconds = parsedTime * 60;
    if(factor == 'h') parsedSeconds = parsedTime * 3600;
    if(factor == 'd') parsedSeconds = parsedTime * 86400;

    if(parsedSeconds > limit && limit != -1)
        return false;

    return parsedSeconds * 1000;
}