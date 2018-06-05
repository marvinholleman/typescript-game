
class Level {

    public width: number;
    public height: number;
    public level: HTMLElement;
    public ground: HTMLElement;
    private tank: Tank;

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

}