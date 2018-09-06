
class Level {
    private atomBomb: Subject;

    public width: number;
    public height: number;
    public level: HTMLElement;
    private ground: HTMLElement;
    private tank: Tank;
    public stoppedGame: boolean;

    public powerUps: Array<PowerUp> = [];
    public nukes: Array<Nuke> = [];

    public gameObjects: Array<GameObject> = [];

    public soldier: Soldier;
    private soldiers: Array<Soldier> = new Array<Soldier>();
    private createSoldiers: number;
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

    private createSoldier() {
        this.soldierPositions.map((position) => {
            this.gameObjects.push(new Soldier(this.level, position, this.width, this.atomBomb));
        });
        if (this.soldiers.length > 100) clearInterval(this.createSoldiers);
    }


    public update() {
        if (this.stoppedGame) {
            return;
        } else {
            if (this.tank.healthBarWidth < 5) this.gameOver(' OUT OF HEALTH')
            else if (this.tank.gasBarWidth < 5) this.gameOver(' OUT OF GAS')

            this.tank.update(this.width);

            console.log(this.gameObjects);
            this.gameObjects.forEach((object, g) => {
                object.move();
            });

            console.log();
            this.nukes.forEach((nuke, n) => {
                //nuke.move();
                if (nuke.hitsGround(this.height)) {
                    this.atomBomb.sendMessage();
                    this.nukes.splice(n, 1)
                }

            });
            this.soldiers.forEach(Soldier => Soldier.move());
            this.powerUps.forEach((powerUp, p) => {
                //powerUp.move(this.height);
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
            this.gameObjects.push(new PowerUp(this.level))
            // this.powerUps.push(new PowerUp(this.level));
        }, 25000);
    }

    private dropNuke() {
        setInterval(() => {
            this.gameObjects.push(new Nuke(this.level));
            // this.nukes.push(new Nuke(this.level));
        }, 20000);
    }

    public gameOver(message: String) {
        while (this.level.hasChildNodes()) {
            this.level.removeChild(this.level.lastChild);
        }
        alert('GAME OVER,' + message);
        this.level.remove();
        this.stoppedGame = true;

        Game.getInstance();


        // location.reload();
    }
}