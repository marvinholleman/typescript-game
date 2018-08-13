class Rifle implements WeaponStrategy {
    public tank: Tank;
    private level: Level;

    private parent: HTMLElement;
    private side: number;

    private bulletCounter: number = 29;

    public bullets: Array<Bullet> = [];

    private fireSound: Sound = new Audio('../docs/sounds/fire.flac');

    constructor(tank: Tank, parent: HTMLElement, side: number) {
        this.tank = tank;
        this.parent = parent;
        this.side = side;
    }

    public fire(side: number): void {
        this.tank.bullets.push(new RifleBullet(this.tank.positionX, this.tank.positionY, this.parent, side, this.tank))
        document.getElementsByTagName('bulletCount')[0].innerHTML = "Bullets " + this.bulletCounter--;
        this.fireSound.play();
        if (this.bulletCounter < 0) {
            alert('GAME OVER, OUT OF BULLETS');
            location.reload();
            Game.getInstance()
        }
    }
}