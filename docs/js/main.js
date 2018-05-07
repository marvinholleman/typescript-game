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
var Game = (function () {
    function Game() {
        var car = new Car();
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    return Game;
}());
window.addEventListener("load", function () { return Game.getInstance(); });
//# sourceMappingURL=main.js.map