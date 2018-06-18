class AtomBomb {
    observers: Observer[] = [];

    constructor() {

    }

    subscribe(c: Observer) {
        this.observers.push(c);
    }

    unsubscribe() {

    }

    sendMessage() {
        for (let c of this.observers) {
            c.notify('new abonnee');
        }
    }
}