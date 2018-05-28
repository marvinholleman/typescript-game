class Level {
    private front: HTMLElement;
    private middle: HTMLElement;
    private ground: HTMLElement;
    private lights: HTMLElement;

    private x: number;

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

<<<<<<< HEAD
        if (this.x < -1500) {
            document.body.removeChild(this.front);
        }
=======
>>>>>>> c17a7aacec71613d7d4888a2d6dda314c1c241db

    }
}