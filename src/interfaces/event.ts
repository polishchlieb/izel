export default interface Event {
    run: (...args: any[]) => void | Promise<void>;

    name: string;
}