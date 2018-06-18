class RocketBullet extends Bullet {

    constructor(x: number, y: number, parent: HTMLElement, side: number, tank: Tank) {
        super(x + 10, y - 27, 'rocket', parent, side, tank);

        this.speedY = -8;

        console.log(this.width);
    }

    move(maxWidth: number, maxHeight: number) {
        this.x += this.speedX;

        if (this.side == -1) {
            this.speedX = -4;
        }

        this.speedY *= 1.02;
        this.speedY += 0.2;

        this.y += this.speedY;


        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        //console.log(this.y);
        if (this.x > maxWidth || this.y > 0) {
            this.remove();
        }
    }

    hitsEnemy(soldier: Soldier): boolean {
        this.width = 200;
        this.height = 50;
        return (this.x < soldier.x + soldier.width &&
            this.x + this.width > soldier.x &&
            this.y + this.height > soldier.y &&
            this.y < soldier.y + soldier.height);


    }
}