class Game {

    private static instance: Game;

    private constructor() {
        let car = new Car();
    }

    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
}

window.addEventListener("load", () => Game.getInstance());