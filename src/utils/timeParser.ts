// 7 * 86400 * 1000
const limit: number = 604800000;

export default class Time {
    public raw: string;
    public ms: number;
    public invalid: boolean;

    constructor(raw: string) {
        this.raw = raw;

        if(!/[0-9]+(?=s|m|h|d)/g.test(raw))
            this.invalid = true;
        else {
            let parsed: string[] = raw.match(/[0-9]+|(s|m|h|d)/g);
            let time: number = parseInt(parsed[0]);

            switch(parsed[1]) {
                case 's': this.ms = time * 1000; break;
                case 'm': this.ms = time * 60000; break;
                case 'h': this.ms = time * 3600000; break;
                case 'd': this.ms = time * 86400000; break;
            }

            if(this.ms > limit && limit != -1) this.invalid = true;
        }
    }
}