class PowerUp extends GameObject {

    private gasPowerUp: HTMLElement;
    private itemPosX: number = Math.floor(Math.random() * 1000);
    private itemPosY: number = 23;
    private itemSpeedY: number = 2;
    private itemWidth: number = 40;

    public tank: Tank;

    constructor(parent: HTMLElement) {
        super(Math.floor(Math.random() * 1000), 23, 'gasPowerUp', 40, 5, parent);

        // this.gasPowerUp = document.createElement('gasPowerUp');
        // parent.appendChild(this.gasPowerUp)
    }

    public move() {
        this.itemPosY += this.itemSpeedY;
        if (this.itemPosY > self.innerHeight - 90) {
            this.itemPosY = self.innerHeight - 90;
        }
        this.div.style.transform = `translate(${this.itemPosX}px, ${this.itemPosY}px)`;
    }

    public hitsTank(tankPositionX: number): boolean {
        tankPositionX = Math.round(tankPositionX);

        return (tankPositionX < this.itemPosX + this.itemWidth &&
            tankPositionX + this.itemWidth > this.itemPosX)
    }

    public remove() {
        this.div.remove();
    }
}