class Rifle implements WeaponStrategy {
    public tank: Tank;

    private parent: HTMLElement;
    private side: number;


    public bullets: Array<Bullet> = [];

    constructor(tank: Tank, parent: HTMLElement, side: number) {
        this.tank = tank;
        this.parent = parent;
        this.side = side;

    }

    public fire(side: number): void {
        this.tank.bullets.push(new RifleBullet(this.tank.positionX, this.tank.positionY, this.parent, side, this.tank))
    }
}