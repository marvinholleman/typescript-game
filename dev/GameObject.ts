class GameObject {
    protected div: HTMLElement;
    protected x: number;
    protected y: number;

    protected width: number;
    protected height: number;

    constructor(x: number, y: number, divName: string, width: number, height: number, parent: HTMLElement) {
        this.div = document.createElement(divName);
        parent.appendChild(this.div);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public remove(): void {
        this.div.remove();
    }

    public move() {
        // this.itemPosY += this.itemSpeedY;
        this.y += 2;
        if (this.y > self.innerHeight - 90) {
            this.y = self.innerHeight - 90;
        }

        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
}