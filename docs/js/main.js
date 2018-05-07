"use strict";
var Car = (function () {
    function Car() {
        this.color = 'blue';
        console.log("vroom!");
        this.drive();
    }
    Car.prototype.drive = function () { };
    return Car;
}());
var Level = (function () {
    function Level() {
        this.front = document.createElement("frontTrees");
        document.body.appendChild(this.front);
        this.middle = document.createElement("middleTrees");
        document.body.appendChild(this.middle);
        this.lights = document.createElement("lights");
        document.body.appendChild(this.lights);
        this.ground = document.createElement("ground");
        document.body.appendChild(this.ground);
        this.x = -1;
        this.speedX = -2;
    }
    Level.prototype.update = function () {
        this.x += this.speedX;
        this.front.style.transform = "translate(" + this.x + "px)";
        if (this.x < -1500) {
            document.body.removeChild(this.level);
        }
    };
    return Level;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.level = new Level();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.level.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { return Game.getInstance(); });
//# sourceMappingURL=main.js.map