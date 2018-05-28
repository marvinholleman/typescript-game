"use strict";
var Car = (function () {
    function Car() {
        var _this = this;
        this.velocityX = 0;
        this.velocityY = 0;
        this.maxVelocityYUp = -20;
        this.maxVelocityYDown = 15;
        this.isMovingHorizontal = false;
        this.frictionFactorX = 0.95;
        this.gravity = 1;
        this.forceX = 10;
        this.sprite = document.createElement("car");
        this.positionX = 100;
        this.positionY = 500;
        this.sprite.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px)";
        document.body.appendChild(this.sprite);
        this.jumpBehaviour = new NormalJumpBehaviour(this);
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 37:
                    _this.isMovingHorizontal = true;
                    _this.velocityX = -_this.forceX;
                    break;
                case 39:
                    _this.isMovingHorizontal = true;
                    _this.velocityX = _this.forceX;
                    break;
            }
        });
        document.addEventListener("keyup", function (e) {
            switch (e.keyCode) {
                case 37:
                    _this.isMovingHorizontal = false;
                    break;
                case 38:
                    _this.jumpBehaviour.jump();
                    break;
                case 39:
                    _this.isMovingHorizontal = false;
                    break;
                case 79:
                    _this.jumpBehaviour = new NormalJumpBehaviour(_this);
                    break;
                case 80:
                    _this.jumpBehaviour = new ForwardJumpBehaviour(_this);
                    break;
            }
        });
    }
    Car.prototype.addVelocityX = function (amount) {
        this.velocityX += amount;
    };
    Car.prototype.addVelocityY = function (amount) {
        this.velocityY += amount;
    };
    Car.prototype.update = function () {
        if (!this.isMovingHorizontal) {
            this.velocityX *= this.frictionFactorX;
        }
        this.velocityY += this.gravity;
        this.capVelocityY();
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;
        if (this.positionY > 500) {
            this.positionY = 500;
        }
        this.sprite.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px)";
    };
    Car.prototype.capVelocityY = function () {
        if (this.velocityY < this.maxVelocityYUp) {
            this.velocityY = this.maxVelocityYUp;
        }
        else if (this.velocityY > this.maxVelocityYDown) {
            this.velocityY = this.maxVelocityYDown;
        }
    };
    return Car;
}());
var ForwardJumpBehaviour = (function () {
    function ForwardJumpBehaviour(car) {
        this.car = car;
    }
    ForwardJumpBehaviour.prototype.jump = function () {
        this.car.addVelocityX(20);
        this.car.addVelocityY(-80);
    };
    return ForwardJumpBehaviour;
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
            document.body.removeChild(this.front);
        }
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
        if (!Game.instance)
            Game.instance = new Game();
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
var NormalJumpBehaviour = (function () {
    function NormalJumpBehaviour(car) {
        this.car = car;
    }
    NormalJumpBehaviour.prototype.jump = function () {
        this.car.addVelocityY(-80);
    };
    return NormalJumpBehaviour;
}());
//# sourceMappingURL=main.js.map