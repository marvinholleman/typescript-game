/// <reference path="AmmoObject.ts"/>

class Bullet extends AmmoObject {

    protected speedX: number = 4;
    protected speedY: number;

    public posx: number;
    protected side: number;
    public tank: Tank;

    public posX: number;
    public posY: number;
    public parent: HTMLElement;

    public bullets: Array<Bullet> = [];

    constructor(x: number, y: number, elementName: string, parent: HTMLElement, side: number, tank: Tank) {
        super(x + 50, y - 55, elementName, 5, 5, parent);
        // this.tank = tank;
        this.posX = x;
        this.posY = y;
        this.parent = parent;
        this.side = side;
        this.tank = tank;
    }

    public move(maxWidth: number, maxHeight: number) {
        this.x += this.speedX;
        if (this.side == -1) {
            this.speedX = -4;
        }

        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";

        if (this.x > maxWidth) {
            this.remove();
        }
    }

    public hitsEnemy(soldier: Soldier): boolean {
        return (this.x < soldier.x + soldier.width &&
            this.x + this.width > soldier.x &&
            this.y < soldier.y + soldier.height);
    }


}

