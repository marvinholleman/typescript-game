
class Level {
    public atomBomb: Subject;
    public width: number;
    public height: number;
    public level: HTMLElement;
    public ground: HTMLElement;
    private tank: Tank;
    private nuke: Nuke;

    private stoppedGame: boolean;

    public game: Game;

    public gasPowerUp: HTMLElement;
    public itemPosX: number;
    private itemPosY: number = 23;
    private itemSpeedY: number = 2;

    public powerUps: Array<PowerUp> = [];
    public nukes: Array<Nuke> = [];

    public soldier: Soldier;
    private soldiers: Array<Soldier> = new Array<Soldier>();
    public createSoldiers: number;
    private soldierPositions: Array<number>

    public bullet: Bullet;
    public rocket: RocketBullet;

    public rifle: Rifle;
    public rocketLauncher: RocketLauncher;

    public rockets: HTMLElement;
    public bullets: HTMLElement;

    public bulletCount: number = 30;
    public rocketCount: number;

    constructor() {
        this.width = self.innerWidth - 110;
        this.height = self.innerHeight;
        this.level = document.createElement('level');
        this.ground = document.createElement('ground')
        this.level.classList.add('level')
        document.body.appendChild(this.level)
        this.level.appendChild(this.ground)

        this.rockets = document.createElement('rocketCount');
        this.bullets = document.createElement('bulletCount');
        this.level.appendChild(this.rockets);
        this.level.appendChild(this.bullets);

        document.getElementsByTagName('bulletCount')[0].innerHTML = "Bullets 30";
        document.getElementsByTagName('rocketCount')[0].innerHTML = "Rockets 15";
        this.atomBomb = new AtomBomb()
        this.tank = new Tank(this.level, this.width, this.atomBomb);

        this.createSoldiers = setInterval(() => this.createSoldier(), 5000);
        this.soldierPositions = [0, this.width];

        this.dropItems();
        this.dropNuke();
    }

    public createSoldier() {
        this.soldierPositions.map((position) => {
            this.soldiers.push(new Soldier(this.level, position, this.width, this.atomBomb));
        });
        if (this.soldiers.length > 100) clearInterval(this.createSoldiers);
    }


    public update() {
        if (this.stoppedGame) {
            return;
        } else {
            if (this.tank.healthBarWidth < 5 || this.tank.gasBarWidth < 5 || this.bulletCount < 1 || this.rocketCount < 1) this.gameOver();
            this.tank.update(this.width);
            this.nukes.forEach((nuke, n) => {
                nuke.move();
                if (nuke.hitsGround(this.height)) {
                    this.atomBomb.sendMessage();
                    this.nukes.splice(n, 1)
                }

            });
            this.soldiers.forEach(Soldier => Soldier.move());
            this.powerUps.forEach((powerUp, p) => {
                powerUp.move(this.height);
                if (powerUp.hitsTank(this.tank.positionX)) {
                    this.tank.refillGas();
                    this.powerUps.splice(p, 1)
                    powerUp.remove();
                }
            });
            this.soldiers.forEach((soldier, i) => { if (soldier.hitsTank(this.tank)) this.soldiers.splice(i, 1) });
            this.tank.bullets.forEach((bullet, j) => {
                bullet.move(this.width + 85, this.height);
                this.soldiers.forEach((soldier, i) => {
                    if (bullet.hitsEnemy(soldier)) {
                        soldier.reduceHealth();
                        this.tank.bullets.splice(j, 1);
                        if (soldier.outOfHealth()) this.soldiers.splice(i, 1)
                        bullet.remove();
                    }
                });
            });
        }

    }

    private dropItems() {
        setInterval(() => {
            this.powerUps.push(new PowerUp(this.level));
        }, 50000);
    }

    private dropNuke() {
        setInterval(() => {
            this.nukes.push(new Nuke(this.level));
        }, 20000);
    }

    private gameOver() {
        while (this.level.hasChildNodes()) {
            this.level.removeChild(this.level.lastChild);
        }
        this.level.remove();
        this.stoppedGame = true;
        new Game();
    }
}