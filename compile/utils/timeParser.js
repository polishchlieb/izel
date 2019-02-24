"use strict";
// https://gist.github.com/polishchlieb/966457040e9788050eb3becc66612f44
exports.__esModule = true;
var limit = 7 * 86400;
var factors = ['s', 'm', 'h', 'd'];
function parseTime(time) {
    var factor = time.slice(-1);
    if (!factors.includes(factor.toLocaleLowerCase()))
        return false;
    var parsedTime = parseInt(time);
    if (isNaN(parsedTime) || parsedTime < 0)
        return false;
    var parsedSeconds;
    if (factor == 's')
        parsedSeconds = parsedTime;
    if (factor == 'm')
        parsedSeconds = parsedTime * 60;
    if (factor == 'h')
        parsedSeconds = parsedTime * 3600;
    if (factor == 'd')
        parsedSeconds = parsedTime * 86400;
    if (parsedSeconds > limit && limit != -1)
        return false;
    return parsedSeconds * 1000;
}
exports.parseTime = parseTime;
