
class Level {

    public width: number;
    public height: number;
    public level: HTMLElement;
    public ground: HTMLElement;
    private tank: Tank;

    public gasPowerUp: HTMLElement;
    private itemPosX: number;
    private itemPosY: number;
    private itemSpeedY: number = 20;

    private powerUps: Array<HTMLElement> = [];


    public soldier: Soldier;
    private soldiers: Array<Soldier> = new Array<Soldier>();
    public createSoldiers: number;
    private soldierPositions: Array<number>



    public bullet: Bullet;
    public rocket: RocketBullet;

    constructor() {
        this.width = self.innerWidth - 110;
        this.height = self.innerHeight;
        this.level = document.createElement('level');
        this.ground = document.createElement('ground')
        this.level.classList.add('level')
        document.body.appendChild(this.level)
        this.level.appendChild(this.ground)
        this.tank = new Tank(this.level, this.width);

        this.createSoldiers = setInterval(() => this.createSoldier(), 2000);
        this.soldierPositions = [0, this.width];

        this.dropItems();


    }

    public createSoldier() {
        this.soldierPositions.map((position) => {
            this.soldiers.push(new Soldier(this.level, position, this.width));
        });

        if (this.soldiers.length > 10) clearInterval(this.createSoldiers);
    }

    public update() {
        this.tank.update(this.width);
        this.soldiers.forEach(Soldier => Soldier.move());
        this.powerUps.forEach((powerUp, i) => { this.fallItem(powerUp) });

        this.tank.bullets.forEach((bullet, j) => {
            bullet.move(this.width + 85, this.height);
            this.soldiers.forEach((Soldier, i) => {
                if (bullet.hitsEnemy(Soldier)) {
                    this.tank.bullets.splice(j, 1);
                    this.soldiers.splice(i, 1)
                    Soldier.remove();
                    bullet.remove();
                }
            });
        });
    }

    private dropItems() {

        setInterval(() => {
            this.gasPowerUp = document.createElement('gasPowerUp');
            this.level.appendChild(this.gasPowerUp)
            this.powerUps.push(this.gasPowerUp);
        }, 8000);
    }

    private fallItem(powerUp: HTMLElement) {
        this.itemPosX = 500;
        this.itemPosY = 3;

        this.itemPosY += this.itemSpeedY;
        this.gasPowerUp.style.transform = `translate(${this.itemPosX}px, ${this.itemPosY}px)`;
    }

    private reFillGas() {
        this.tank.gasBarWidth = 80;
    }

}