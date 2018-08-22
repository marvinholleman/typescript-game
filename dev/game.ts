/// <reference path="level.ts"/>

class Game {

    public static instance: Game;

    public level: Level;
    private soldier: Soldier;
    private gameStart: boolean = false;
    private startScreen: HTMLElement;

    private gameSound: Sound = new Audio('../docs/sounds/music.ogg');

    constructor() {
        this.startScreen = document.createElement('startScreen');
        document.body.appendChild(this.startScreen);
        this.startScreen.innerHTML = '<p class="start-text">Press any key to start game</p><p class="control-text">Use arrow keys to drive<br/><div class="key"></div><br/>Switch between weapons with O & P <br/> & <br/>Fire with space<br/><div class="key-p"></div><br/><div class="space-key" ></div>';
        document.onkeypress = (e) => {
            if (!this.gameStart) {
                this.level = new Level();
                this.gameLoop();
                this.gameStart = true;
                this.removeStartScreen();
                this.gameSound.loop = true;
                this.gameSound.play();
            }
        }
    }

    public static getInstance() {
        console.log(Game.instance)
        if (!Game.instance)
            Game.instance = new Game();
        return Game.instance;
    }

    private gameLoop() {
        this.level.update();
        requestAnimationFrame(() => this.gameLoop());
    }

    private removeStartScreen() {
        this.startScreen.remove();
    }
}

window.addEventListener("load", () => Game.getInstance());