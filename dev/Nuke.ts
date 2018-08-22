class Nuke extends GameObject {

    public nuke: HTMLElement;
    public itemPosX: number = window.innerWidth / 2;
    private itemPosY: number = -400;
    private itemSpeedY: number = 2;
    private itemWidth: number = 40;

    private explosion: Sound;

    constructor(parent: HTMLElement) {
        super(window.innerWidth / 2, -400, 'nuke', 40, 5, parent);

        // this.nuke = document.createElement('nuke');
        // parent.appendChild(this.nuke)
        // this.itemPosX = window.innerWidth / 2;
        // this.move()
    }

    public move() {
        this.itemPosY += this.itemSpeedY;
        this.div.style.transform = "translate(" + this.itemPosX + "px, " + this.itemPosY + "px)";
    }

    public hitsGround(height: number): boolean {
        this.explosion = new Audio('../docs/sounds/DeathFlash.flac');

        if (this.itemPosY > height - 400) {
            this.remove();
            this.explosion.play();
            return true;
        }
        return false;
    }

    public remove() {
        this.div.remove();
    }
}