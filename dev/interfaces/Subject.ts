interface Subject {
    observers: Observer[];
    subscribe(c: Observer): void;
    unsubscribe(c: Observer): void;
    sendMessage(): void;
}