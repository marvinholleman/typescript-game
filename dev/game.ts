/// <reference path="level.ts"/>

class Game {

    private static instance: Game;

    private level: Level;

    //Constructor private, omdat singleton
    private constructor() {
        this.level = new Level();
        requestAnimationFrame(() => this.gameLoop());
    }

    public static getInstance() {
        if (!Game.instance)
            Game.instance = new Game();
        return Game.instance;
    }

    private gameLoop() {
        this.level.update();
        requestAnimationFrame(() => this.gameLoop());
    }
}

window.addEventListener("load", () => Game.getInstance());