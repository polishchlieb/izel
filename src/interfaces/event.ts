export interface Event {
    run: (...args: any[]) => void;
    name: string;
}