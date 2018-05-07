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
        console.log("new game created!");
        var c = new Car();
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
//# sourceMappingURL=main.js.map