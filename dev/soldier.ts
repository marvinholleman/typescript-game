class Soldier implements Observer {
    private atomBomb: Subject;

    private speed: number = 0;

    public healthBar: HTMLElement;
    public healtBarWidth: number = 40;

    public soldier: HTMLElement;
    public x: number;
    public y: number;
    private side: number;

    private speedX: number = 0.3;
    private speedY: number = 1;

    public width: number;
    public height: number;
    private levelWidth: number;
    public minWidth: number = 0;
    private tank: Tank;

    constructor(parent: HTMLElement, position: number, levelWidth: number, atomBomb: Subject) {
        this.atomBomb = atomBomb;
        this.atomBomb.subscribe(this);
        this.soldier = document.createElement("soldier");
        this.healthBar = document.createElement("soldierHealthBar")
        parent.appendChild(this.soldier);
        this.soldier.appendChild(this.healthBar);
        this.width = 20;
        this.height = 30;
        this.side = 1;
        this.x = Math.round(Math.random() * 5) * 120;
        this.levelWidth = levelWidth;
        this.y = Math.floor(Math.random() * 20);
        this.speed = -1;
        this.startPosition(position);
    }

    notify(p: string) {
        console.log('atom dropped on soldier');
        this.reduceHealth();
    }


    public startPosition(position: number) {
        this.x = position;
        if (this.x == this.levelWidth) {
            this.side = -1;
            this.speedX = -0.3
        } else {
            this.side = 1;
        }
    }

    public move() {
        this.x += this.speedX;
        if (this.x > this.levelWidth) {
            this.x = this.minWidth;
            this.side = 1;
        } else if (this.x < this.minWidth) {
            this.x = this.levelWidth;
            this.side = -1;
        } if (this.x > window.innerWidth || this.x < -10) {
            this.speedX *= -1;
        }
        this.soldier.style.transform = `translate(${this.x}px, ${this.y}px) scaleX(${this.side})`
    }

    public hitsTank(tank: Tank) {
        if (tank.positionX < this.x + this.width &&
            tank.positionX + this.width > this.x) {
            tank.reduceHealth(1.004);
            this.remove();
        }
    }

    public remove(): void {
        this.soldier.remove();
    }

    public reduceHealth() {
        this.healtBarWidth = this.healtBarWidth / 2;
        this.healthBar.style.width = this.healtBarWidth + 'px';
    }

    public outOfHealth(): boolean {
        if (this.healtBarWidth == 5) {
            console.log('outofHealth')
            this.remove();
            return true;
        }
        return false;
    }
}