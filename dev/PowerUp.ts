class PowerUp {

    public gasPowerUp: HTMLElement;
    public itemPosX: number = Math.floor(Math.random() * 1000);
    private itemPosY: number = 23;
    private itemSpeedY: number = 2;
    private itemWidth: number = 40;

    public tank: Tank;

    constructor(parent: HTMLElement) {
        this.gasPowerUp = document.createElement('gasPowerUp');
        parent.appendChild(this.gasPowerUp)
    }

    public move(height: number) {
        this.itemPosY += this.itemSpeedY;
        if (this.itemPosY > height - 90) {
            this.itemPosY = height - 90;
        }
        this.gasPowerUp.style.transform = `translate(${this.itemPosX}px, ${this.itemPosY}px)`;
    }

    public hitsTank(tankPositionX: number): boolean {
        tankPositionX = Math.round(tankPositionX);

        return (tankPositionX < this.itemPosX + this.itemWidth &&
            tankPositionX + this.itemWidth > this.itemPosX)
    }

    public remove() {
        this.gasPowerUp.remove();
    }
}