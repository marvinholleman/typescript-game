"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AmmoObject = (function () {
    function AmmoObject(x, y, divName, width, height, parent) {
        this.div = document.createElement(divName);
        parent.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    AmmoObject.prototype.remove = function () {
        this.div.remove();
    };
    return AmmoObject;
}());
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y, elementName, parent, side, tank) {
        var _this = _super.call(this, x + 50, y - 55, elementName, 5, 5, parent) || this;
        _this.speedX = 4;
        _this.bullets = [];
        _this.posX = x;
        _this.posY = y;
        _this.parent = parent;
        _this.side = side;
        _this.tank = tank;
        return _this;
    }
    Bullet.prototype.move = function (maxWidth, maxHeight) {
        this.x += this.speedX;
        if (this.side == -1) {
            this.speedX = -4;
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        if (this.x > maxWidth) {
            this.remove();
        }
    };
    Bullet.prototype.hitsEnemy = function (soldier) {
        return (this.x < soldier.x + soldier.width &&
            this.x + this.width > soldier.x &&
            this.y < soldier.y + soldier.height);
    };
    return Bullet;
}(AmmoObject));
var Level = (function () {
    function Level() {
        var _this = this;
        this.soldiers = new Array();
        this.width = self.innerWidth - 110;
        this.height = self.innerHeight;
        this.level = document.createElement('level');
        this.ground = document.createElement('ground');
        this.level.classList.add('level');
        document.body.appendChild(this.level);
        this.level.appendChild(this.ground);
        this.tank = new Tank(this.level, this.width);
        this.createSoldiers = setInterval(function () { return _this.createSoldier(); }, 2000);
        this.soldierPositions = [0, this.width];
    }
    Level.prototype.createSoldier = function () {
        var _this = this;
        this.soldierPositions.map(function (position) {
            _this.soldiers.push(new Soldier(_this.level, position, _this.width));
        });
        if (this.soldiers.length > 10)
            clearInterval(this.createSoldiers);
    };
    Level.prototype.update = function () {
        var _this = this;
        this.tank.update(this.width);
        this.soldiers.forEach(function (Soldier) { return Soldier.move(); });
        this.tank.bullets.forEach(function (bullet, j) {
            bullet.move(_this.width + 85, _this.height);
            _this.soldiers.forEach(function (Soldier, i) {
                if (bullet.hitsEnemy(Soldier)) {
                    _this.tank.bullets.splice(j, 1);
                    _this.soldiers.splice(i, 1);
                    Soldier.remove();
                    bullet.remove();
                }
            });
        });
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
        if (!Game.instance)
            Game.instance = new Game();
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
var Rifle = (function () {
    function Rifle(tank, parent, side) {
        this.bullets = [];
        this.tank = tank;
        this.parent = parent;
        this.side = side;
    }
    Rifle.prototype.fire = function (side) {
        this.tank.bullets.push(new RifleBullet(this.tank.positionX, this.tank.positionY, this.parent, side, this.tank));
    };
    return Rifle;
}());
var RifleBullet = (function (_super) {
    __extends(RifleBullet, _super);
    function RifleBullet(x, y, parent, side, tank) {
        return _super.call(this, x + 10, y - 0, 'bullet', parent, side, tank) || this;
    }
    return RifleBullet;
}(Bullet));
var RocketBullet = (function (_super) {
    __extends(RocketBullet, _super);
    function RocketBullet(x, y, parent, side, tank) {
        var _this = _super.call(this, x + 10, y - 27, 'rocket', parent, side, tank) || this;
        _this.speedY = -8;
        return _this;
    }
    RocketBullet.prototype.move = function (maxWidth, maxHeight) {
        this.x += this.speedX;
        if (this.side == -1) {
            this.speedX = -4;
        }
        this.speedY *= 1.02;
        this.speedY += 0.2;
        this.y += this.speedY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        if (this.x > maxWidth || this.y > 0) {
            this.remove();
        }
    };
    RocketBullet.prototype.hitsEnemy = function (soldier) {
        return (this.x < soldier.x + soldier.width &&
            this.x + this.width > soldier.x &&
            this.y + this.height > soldier.y &&
            this.y < soldier.y + soldier.height);
    };
    return RocketBullet;
}(Bullet));
var RocketLauncher = (function () {
    function RocketLauncher(tank, parent, side) {
        this.rockets = [];
        this.tank = tank;
        this.parent = parent;
        this.side = side;
    }
    RocketLauncher.prototype.fire = function (side) {
        this.tank.bullets.push(new RocketBullet(this.tank.positionX, this.tank.positionY, this.parent, side, this.tank));
    };
    return RocketLauncher;
}());
var Soldier = (function () {
    function Soldier(parent, position, levelWidth) {
        this.speed = 0;
        this.speedX = 0.3;
        this.speedY = 1;
        this.minWidth = 0;
        this.soldier = document.createElement("soldier");
        parent.appendChild(this.soldier);
        this.width = 80;
        this.height = 30;
        this.side = 1;
        this.x = Math.round(Math.random() * 5) * 120;
        this.levelWidth = levelWidth;
        this.y = Math.floor(Math.random() * 20);
        this.speed = -1;
        this.startPosition(position);
    }
    Soldier.prototype.startPosition = function (position) {
        this.x = position;
        if (this.x == this.levelWidth) {
            this.side = -1;
            this.speedX = -0.3;
        }
        else {
            this.side = 1;
        }
    };
    Soldier.prototype.move = function () {
        this.x += this.speedX;
        if (this.x > this.levelWidth) {
            this.x = this.minWidth;
            this.side = 1;
        }
        else if (this.x < this.minWidth) {
            this.x = this.levelWidth;
            this.side = -1;
        }
        if (this.x > window.innerWidth || this.x < -10) {
            this.speedX *= -1;
        }
        this.soldier.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(" + this.side + ")";
    };
    Soldier.prototype.remove = function () {
        this.soldier.remove();
    };
    return Soldier;
}());
var Tank = (function () {
    function Tank(parent, levelWidth) {
        var _this = this;
        this.velocityX = 0;
        this.velocityY = 0;
        this.maxVelocityYUp = -20;
        this.maxVelocityYDown = 15;
        this.minWidth = 0;
        this.isMovingHorizontal = false;
        this.frictionFactorX = 0.95;
        this.gravity = 1;
        this.forceX = 3;
        this.bullets = [];
        this.showAmmo = false;
        this.sprite = document.createElement("tank");
        this.levelWidth = levelWidth;
        this.positionX = levelWidth / 2;
        this.positionY = 200;
        this.side = 1;
        this.parent = parent;
        this.sprite.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px)";
        parent.appendChild(this.sprite);
        this.sprite.classList.add('tank');
        this.rifle = new Rifle(this, this.parent, this.side);
        this.rocketLauncher = new RocketLauncher(this, this.parent, this.side);
        this.activeWeaponStrategy = this.rifle;
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 37:
                    _this.isMovingHorizontal = true;
                    _this.velocityX = -_this.forceX;
                    _this.side = -1;
                    break;
                case 39:
                    _this.isMovingHorizontal = true;
                    _this.velocityX = _this.forceX;
                    _this.side = 1;
                    break;
            }
        });
        document.addEventListener("keyup", function (e) {
            switch (e.keyCode) {
                case 37:
                    _this.isMovingHorizontal = false;
                    break;
                case 32:
                    _this.activeWeaponStrategy.fire(_this.side);
                    break;
                case 39:
                    _this.isMovingHorizontal = false;
                    break;
                case 79:
                    _this.activeWeaponStrategy = _this.rifle;
                    break;
                case 80:
                    _this.activeWeaponStrategy = _this.rocketLauncher;
                    break;
            }
        });
    }
    Tank.prototype.addVelocityX = function (amount) {
        this.velocityX += amount;
    };
    Tank.prototype.addVelocityY = function (amount) {
        this.velocityY += amount;
    };
    Tank.prototype.update = function (maxWidth) {
        if (this.positionX > maxWidth) {
            this.positionX = this.minWidth;
        }
        else if (this.positionX < this.minWidth) {
            this.positionX = maxWidth;
        }
        if (!this.isMovingHorizontal) {
            this.velocityX *= this.frictionFactorX;
        }
        this.velocityY += this.gravity;
        this.capVelocityY();
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;
        if (this.positionY > 0) {
            this.positionY = 0;
        }
        this.sprite.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px) scaleX(" + this.side + ") ";
    };
    Tank.prototype.capVelocityY = function () {
        if (this.velocityY < this.maxVelocityYUp) {
            this.velocityY = this.maxVelocityYUp;
        }
        else if (this.velocityY > this.maxVelocityYDown) {
            this.velocityY = this.maxVelocityYDown;
        }
    };
    return Tank;
}());
//# sourceMappingURL=main.js.map