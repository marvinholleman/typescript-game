class Soldier {
    private speed: number = 0;

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

    constructor(parent: HTMLElement, position: number, levelWidth: number) {
        this.soldier = document.createElement("soldier");
        parent.appendChild(this.soldier);
        this.width = 20;
        this.height = 30;
        this.side = 1;
        this.x = Math.round(Math.random() * 5) * 120;
        this.levelWidth = levelWidth;
        this.y = Math.floor(Math.random() * 20);
        this.speed = -1;
        this.startPosition(position);
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
            tank.reduceHealth();
            this.remove();
        }
    }

    public remove(): void {
        this.soldier.remove();
    }
}