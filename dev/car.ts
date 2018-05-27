class Car {
    private sprite: HTMLElement;
    private positionX: number;
    private positionY: number;
    private velocityX: number = 0;
    
    constructor() {
        this.sprite = document.createElement("car");

        // Set default position.
        this.positionX = 100;
        this.positionY = 300;

        // Place sprite at position.
        this.sprite.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px)";

        document.body.appendChild(this.sprite);

        // Add key listeners to drive and brake.
        document.addEventListener("keydown", (e) => {
            // console.log(e.keyCode);
            
            if(e.keyCode == 37) {
                this.drive(-5);
            } else if(e.keyCode == 39){
                this.drive(5);
            }
        });

        document.addEventListener("keyup", (e) => {
            if(e.keyCode == 37 || e.keyCode == 39) {
                this.brake();
            }
        });
    }

   public update() {
       
        // Apply velocity to position, then translate car by position so it moves.
        this.positionX += this.velocityX;
        this.sprite.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px)";
   }

   // Set's x velocity so we can move car.
   private drive(velocityX: number): void {    
        this.velocityX = velocityX;
   }

   // Set's velocity to zero so car stops moving.
   private brake(): void {
       this.velocityX = 0;
   }
}