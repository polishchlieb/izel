export default interface Event {
    run: (...args: any[]) => any;
    name: string;
}
