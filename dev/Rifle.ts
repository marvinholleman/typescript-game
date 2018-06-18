class Rifle implements WeaponStrategy {
    public tank: Tank;
    public level: Level;

    private parent: HTMLElement;
    private side: number;

    public bulletCounter: number = 29;

    public bullets: Array<Bullet> = [];

    constructor(tank: Tank, parent: HTMLElement, side: number) {
        this.tank = tank;
        this.parent = parent;
        this.side = side;
    }

    public fire(side: number): void {
        this.tank.bullets.push(new RifleBullet(this.tank.positionX, this.tank.positionY, this.parent, side, this.tank))
        document.getElementsByTagName('bulletCount')[0].innerHTML = "Bullets " + this.bulletCounter--;
        if (this.bulletCounter < 1) {
            this.level.bulletCount = 0;
        }
    }
}