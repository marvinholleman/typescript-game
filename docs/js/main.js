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
var AtomBomb = (function () {
    function AtomBomb() {
        this.observers = [];
    }
    AtomBomb.prototype.subscribe = function (c) {
        this.observers.push(c);
    };
    AtomBomb.prototype.unsubscribe = function () {
    };
    AtomBomb.prototype.sendMessage = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var c = _a[_i];
            c.notify('new abonnee');
        }
    };
    return AtomBomb;
}());
var GameObject = (function () {
    function GameObject(x, y, divName, width, height, parent) {
        this.div = document.createElement(divName);
        parent.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    GameObject.prototype.remove = function () {
        this.div.remove();
    };
    return GameObject;
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
}(GameObject));
var Level = (function () {
    function Level() {
        var _this = this;
        this.powerUps = [];
        this.nukes = [];
        this.soldiers = new Array();
        this.bulletCount = 30;
        this.width = self.innerWidth - 110;
        this.height = self.innerHeight;
        this.level = document.createElement('level');
        this.ground = document.createElement('ground');
        this.level.classList.add('level');
        document.body.appendChild(this.level);
        this.level.appendChild(this.ground);
        this.rockets = document.createElement('rocketCount');
        this.bullets = document.createElement('bulletCount');
        this.level.appendChild(this.rockets);
        this.level.appendChild(this.bullets);
        document.getElementsByTagName('bulletCount')[0].innerHTML = "Bullets 30";
        document.getElementsByTagName('rocketCount')[0].innerHTML = "Rockets 15";
        this.atomBomb = new AtomBomb();
        this.tank = new Tank(this.level, this.width, this.atomBomb);
        this.createSoldiers = setInterval(function () { return _this.createSoldier(); }, 5000);
        this.soldierPositions = [0, this.width];
        this.dropItems();
        this.dropNuke();
    }
    Level.prototype.createSoldier = function () {
        var _this = this;
        this.soldierPositions.map(function (position) {
            _this.soldiers.push(new Soldier(_this.level, position, _this.width, _this.atomBomb));
        });
        if (this.soldiers.length > 100)
            clearInterval(this.createSoldiers);
    };
    Level.prototype.update = function () {
        var _this = this;
        if (this.stoppedGame) {
            return;
        }
        else {
            if (this.tank.healthBarWidth < 5)
                this.gameOver(' OUT OF HEALTH');
            else if (this.tank.gasBarWidth < 5)
                this.gameOver(' OUT OF GAS');
            this.tank.update(this.width);
            this.nukes.forEach(function (nuke, n) {
                nuke.move();
                if (nuke.hitsGround(_this.height)) {
                    _this.atomBomb.sendMessage();
                    _this.nukes.splice(n, 1);
                }
            });
            this.soldiers.forEach(function (Soldier) { return Soldier.move(); });
            this.powerUps.forEach(function (powerUp, p) {
                powerUp.move(_this.height);
                if (powerUp.hitsTank(_this.tank.positionX)) {
                    _this.tank.refillGas();
                    _this.powerUps.splice(p, 1);
                    powerUp.remove();
                }
            });
            this.soldiers.forEach(function (soldier, i) { if (soldier.hitsTank(_this.tank))
                _this.soldiers.splice(i, 1); });
            this.tank.bullets.forEach(function (bullet, j) {
                bullet.move(_this.width + 85, _this.height);
                _this.soldiers.forEach(function (soldier, i) {
                    if (bullet.hitsEnemy(soldier)) {
                        soldier.reduceHealth();
                        _this.tank.bullets.splice(j, 1);
                        if (soldier.outOfHealth())
                            _this.soldiers.splice(i, 1);
                        bullet.remove();
                    }
                });
            });
        }
    };
    Level.prototype.dropItems = function () {
        var _this = this;
        setInterval(function () {
            _this.powerUps.push(new PowerUp(_this.level));
        }, 50000);
    };
    Level.prototype.dropNuke = function () {
        var _this = this;
        setInterval(function () {
            _this.nukes.push(new Nuke(_this.level));
        }, 20000);
    };
    Level.prototype.gameOver = function (message) {
        while (this.level.hasChildNodes()) {
            this.level.removeChild(this.level.lastChild);
        }
        alert('GAME OVER,' + message);
        this.level.remove();
        this.stoppedGame = true;
        Game.getInstance();
        location.reload();
    };
    return Level;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.gameStart = false;
        this.gameSound = new Audio('../docs/sounds/music.ogg');
        this.startScreen = document.createElement('startScreen');
        document.body.appendChild(this.startScreen);
        this.startScreen.innerHTML = '<p class="start-text">Press any key to start game</p><p class="control-text">Use arrow keys to drive<br/><img class="key" src="../docs/img/arrows.png"/><br/>Switch between weapons with O & P <br/> & <br/>Fire with space<br/><img class="key-p" src="../docs/img/p-o.png""/><br/><img class="space-key" src="../docs/img/space-key.png""/>';
        document.onkeypress = function (e) {
            if (!_this.gameStart) {
                _this.level = new Level();
                _this.gameLoop();
                _this.gameStart = true;
                _this.removeStartScreen();
                _this.gameSound.loop = true;
                _this.gameSound.play();
            }
        };
    }
    Game.getInstance = function () {
        console.log(Game.instance);
        if (!Game.instance)
            Game.instance = new Game();
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.level.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.removeStartScreen = function () {
        this.startScreen.remove();
    };
    return Game;
}());
window.addEventListener("load", function () { return Game.getInstance(); });
var Nuke = (function () {
    function Nuke(parent) {
        this.itemPosY = -400;
        this.itemSpeedY = 2;
        this.itemWidth = 40;
        this.nuke = document.createElement('nuke');
        parent.appendChild(this.nuke);
        this.itemPosX = window.innerWidth / 2;
    }
    Nuke.prototype.move = function () {
        this.itemPosY += this.itemSpeedY;
        this.nuke.style.transform = "translate(" + this.itemPosX + "px, " + this.itemPosY + "px)";
    };
    Nuke.prototype.hitsGround = function (height) {
        this.explosion = new Audio('../docs/sounds/DeathFlash.flac');
        if (this.itemPosY > height - 400) {
            this.remove();
            this.explosion.play();
            return true;
        }
        return false;
    };
    Nuke.prototype.remove = function () {
        this.nuke.remove();
    };
    return Nuke;
}());
var PowerUp = (function () {
    function PowerUp(parent) {
        this.itemPosX = Math.floor(Math.random() * 1000);
        this.itemPosY = 23;
        this.itemSpeedY = 2;
        this.itemWidth = 40;
        this.gasPowerUp = document.createElement('gasPowerUp');
        parent.appendChild(this.gasPowerUp);
    }
    PowerUp.prototype.move = function (height) {
        this.itemPosY += this.itemSpeedY;
        if (this.itemPosY > height - 90) {
            this.itemPosY = height - 90;
        }
        this.gasPowerUp.style.transform = "translate(" + this.itemPosX + "px, " + this.itemPosY + "px)";
    };
    PowerUp.prototype.hitsTank = function (tankPositionX) {
        tankPositionX = Math.round(tankPositionX);
        return (tankPositionX < this.itemPosX + this.itemWidth &&
            tankPositionX + this.itemWidth > this.itemPosX);
    };
    PowerUp.prototype.remove = function () {
        this.gasPowerUp.remove();
    };
    return PowerUp;
}());
var Rifle = (function () {
    function Rifle(tank, parent, side) {
        this.bulletCounter = 29;
        this.bullets = [];
        this.fireSound = new Audio('../docs/sounds/fire.flac');
        this.tank = tank;
        this.parent = parent;
        this.side = side;
    }
    Rifle.prototype.fire = function (side) {
        this.tank.bullets.push(new RifleBullet(this.tank.positionX, this.tank.positionY, this.parent, side, this.tank));
        document.getElementsByTagName('bulletCount')[0].innerHTML = "Bullets " + this.bulletCounter--;
        this.fireSound.play();
        if (this.bulletCounter < 0) {
            alert('GAME OVER, OUT OF BULLETS');
            location.reload();
            Game.getInstance();
        }
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
        console.log(_this.width);
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
        this.width = 200;
        this.height = 50;
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
        this.rocketBulletCounter = 14;
        this.tank = tank;
        this.parent = parent;
        this.side = side;
    }
    RocketLauncher.prototype.fire = function (side) {
        this.tank.bullets.push(new RocketBullet(this.tank.positionX, this.tank.positionY, this.parent, side, this.tank));
        document.getElementsByTagName('rocketCount')[0].innerHTML = "Rockets " + this.rocketBulletCounter--;
        if (this.rocketBulletCounter < 0) {
            alert('GAME OVER, OUT OF ROCKETS');
            location.reload();
            Game.getInstance();
        }
    };
    return RocketLauncher;
}());
var Soldier = (function () {
    function Soldier(parent, position, levelWidth, atomBomb) {
        this.speed = 0;
        this.healtBarWidth = 40;
        this.speedX = 0.3;
        this.minWidth = 0;
        this.dieSound = new Audio('../docs/sounds/aargh0.ogg');
        this.atomBomb = atomBomb;
        this.atomBomb.subscribe(this);
        this.soldier = document.createElement("soldier");
        this.healthBar = document.createElement("soldierHealthBar");
        parent.appendChild(this.soldier);
        this.soldier.appendChild(this.healthBar);
        this.width = 20;
        this.height = 30;
        this.side = 1;
        this.x = Math.round(Math.random() * 5) * 120;
        this.levelWidth = levelWidth;
        this.y = Math.floor(Math.random() * 20);
        this.speed = -1;
        this.startPosition(position);
    }
    Soldier.prototype.notify = function (p) {
        console.log('atom dropped on soldier');
        this.reduceHealth();
    };
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
    Soldier.prototype.hitsTank = function (tank) {
        if (tank.positionX < this.x + this.width &&
            tank.positionX + this.width > this.x) {
            tank.reduceHealth(1.004);
            this.remove();
        }
    };
    Soldier.prototype.remove = function () {
        this.soldier.remove();
    };
    Soldier.prototype.reduceHealth = function () {
        this.healtBarWidth = this.healtBarWidth / 2;
        this.healthBar.style.width = this.healtBarWidth + 'px';
    };
    Soldier.prototype.outOfHealth = function () {
        if (this.healtBarWidth == 5) {
            console.log('outofHealth');
            this.remove();
            this.dieSound.play();
            return true;
        }
        return false;
    };
    return Soldier;
}());
var Tank = (function () {
    function Tank(parent, levelWidth, atomBomb) {
        var _this = this;
        this.gasBarWidth = 80;
        this.healthBarWidth = 80;
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
        this.atomBomb = atomBomb;
        this.atomBomb.subscribe(this);
        this.sprite = document.createElement("tank");
        this.gasBar = document.createElement("gasBar");
        this.healthBar = document.createElement("healthBar");
        this.levelWidth = levelWidth;
        this.positionX = levelWidth / 2;
        this.positionY = 200;
        this.side = 1;
        this.parent = parent;
        this.sprite.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px)";
        parent.appendChild(this.sprite);
        this.sprite.appendChild(this.gasBar);
        this.sprite.appendChild(this.healthBar);
        this.sprite.classList.add('tank');
        setInterval(function () {
            if (_this.gasBarWidth > 1) {
                console.log('mined');
                _this.gasBarWidth--;
                _this.gasBar.style.width = _this.gasBarWidth + 'px';
            }
        }, 1000);
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
    Tank.prototype.notify = function (p) {
        this.reduceHealth(1.2);
        console.log('atom dropped on tank');
    };
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
    Tank.prototype.refillGas = function () {
        console.log('refilled');
        this.gasBarWidth = 80;
    };
    Tank.prototype.reduceHealth = function (hit) {
        console.log(hit);
        this.healthBarWidth = this.healthBarWidth / hit;
        this.healthBar.style.width = this.healthBarWidth + 'px';
    };
    return Tank;
}());
//# sourceMappingURL=main.js.map