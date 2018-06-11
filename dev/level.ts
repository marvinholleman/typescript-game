
class Level {

    public width: number;
    public height: number;
    public level: HTMLElement;
    public ground: HTMLElement;
    private tank: Tank;

    public gasPowerUp: HTMLElement;
    public itemPosX: number;
    private itemPosY: number = 23;
    private itemSpeedY: number = 2;

    public powerUps: Array<PowerUp> = [];

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

        this.tank = new Tank(this.level, this.width);
        this.createSoldiers = setInterval(() => this.createSoldier(), 2000);
        this.soldierPositions = [0, this.width];

        this.dropItems();
    }

    public createSoldier() {
        this.soldierPositions.map((position) => {
            this.soldiers.push(new Soldier(this.level, position, this.width));
        });

        if (this.soldiers.length > 50) clearInterval(this.createSoldiers);
    }

    public update() {
        this.tank.update(this.width);
        this.soldiers.forEach(Soldier => Soldier.move());
        this.powerUps.forEach((powerUp, p) => {
            powerUp.move(this.height);
            if (powerUp.hitsTank(this.tank.positionX)) {
                this.tank.refillGas();
                this.powerUps.splice(p, 1)
                powerUp.remove();
            }
        });

        this.soldiers.forEach((soldier, i) => { soldier.hitsTank(this.tank) });

        this.tank.bullets.forEach((bullet, j) => {
            bullet.move(this.width + 85, this.height);
            this.soldiers.forEach((soldier, i) => {
                if (bullet.hitsEnemy(soldier)) {
                    this.tank.bullets.splice(j, 1);
                    this.soldiers.splice(i, 1)
                    soldier.remove();
                    bullet.remove();
                }
            });
        });
    }

    private dropItems() {
        setInterval(() => {
            this.powerUps.push(new PowerUp(this.level));
        }, 50000);
    }
}