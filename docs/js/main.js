"use strict";
var Car = (function () {
    function Car() {
        var _this = this;
        this.velocityX = 0;
        this.sprite = document.createElement("car");
        this.positionX = 100;
        this.positionY = 300;
        this.sprite.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px)";
        document.body.appendChild(this.sprite);
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 37) {
                _this.drive(-5);
            }
            else if (e.keyCode == 39) {
                _this.drive(5);
            }
        });
        document.addEventListener("keyup", function (e) {
            if (e.keyCode == 37 || e.keyCode == 39) {
                _this.brake();
            }
        });
    }
    Car.prototype.update = function () {
        this.positionX += this.velocityX;
        this.sprite.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px)";
    };
    Car.prototype.drive = function (velocityX) {
        this.velocityX = velocityX;
    };
    Car.prototype.brake = function () {
        this.velocityX = 0;
    };
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
    };
    return Level;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.level = new Level();
        this.car = new Car();
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
        this.car.update();
        this.level.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { return Game.getInstance(); });
//# sourceMappingURL=main.js.map