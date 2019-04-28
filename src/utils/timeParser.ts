const limit = 7 * 86400 * 1000;
const pattern = /[0-9]+(?=s|m|h|d)/;

export function parseTime(time: string) {
    if(!pattern.test(time))
        return false;

    const parsed = time.split(/[0-9]+(?=s|m|h|d)/);
    let parsedTime = parseInt(parsed[0]);

    switch(parsed[1]) {
        case 's': parsedTime = parsedTime * 1000; break;
        case 'm': parsedTime = parsedTime * 60000; break;
        case 'h': parsedTime = parsedTime * 3600000; break;
        case 'd': parsedTime = parsedTime * 86400000; break;
    }

    return (parsedTime > limit && limit != -1) ? false : parsedTime;
}