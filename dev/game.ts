/// <reference path="level.ts"/>

class Game {

    private static instance: Game;

    private level: Level;
    private car: Car;

    private constructor() {
        this.level = new Level();
        this.car = new Car();

        requestAnimationFrame(() => this.gameLoop());
    }

    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private gameLoop() {
        this.car.update();
        this.level.update();

        requestAnimationFrame(() => this.gameLoop());
    }
}

window.addEventListener("load", () => Game.getInstance());