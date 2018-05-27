class Level {
    private front: HTMLElement;
    private middle: HTMLElement;
    private ground: HTMLElement;
    private lights: HTMLElement;

    private x: number;
    private y: number;

    private speedX: number;

    constructor() {
        this.front = document.createElement("frontTrees");
        document.body.appendChild(this.front);

        this.middle = document.createElement("middleTrees")
        document.body.appendChild(this.middle);

        this.lights = document.createElement("lights");
        document.body.appendChild(this.lights);

        this.ground = document.createElement("ground");
        document.body.appendChild(this.ground);

        this.x = -1;
        this.speedX = -2;
    }

    public update(): void {
        this.x += this.speedX;
        this.front.style.transform = "translate(" + this.x + "px)";


    }
}