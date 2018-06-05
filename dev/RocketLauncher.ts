class RocketLauncher implements WeaponStrategy {
    public tank: Tank;

    private parent: HTMLElement;
    private side: number;


    public rockets: Array<RocketBullet> = [];

    constructor(tank: Tank, parent: HTMLElement, side: number) {
        this.tank = tank;
        this.parent = parent;
        this.side = side;

    }

    public fire(side: number): void {
        this.tank.bullets.push(new RocketBullet(this.tank.positionX, this.tank.positionY, this.parent, side, this.tank))
    }
}