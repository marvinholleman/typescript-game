class Car {
    private sprite: HTMLElement;
    private positionX: number;
    private positionY: number;
    private velocityX: number = 0;
    private velocityY: number = 0;
    private maxVelocityYUp: number = -20;
    private maxVelocityYDown: number = 15;

    private isMovingHorizontal: boolean = false;

    private frictionFactorX: number = 0.95;
    private gravity: number = 1;

    private forceX:number  = 10;
    private jumpBehaviour: JumpBehaviour;

    constructor() {
        this.sprite = document.createElement("car");

        // Set default position.
        this.positionX = 100;
        this.positionY = 300;

        // Place sprite at position.
        this.sprite.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px)";
        document.body.appendChild(this.sprite);

        this.jumpBehaviour = new NormalJumpBehaviour(this);

        // Add key listeners to drive and brake.
        document.addEventListener("keydown", (e) => {
            // console.log(e.keyCode);
            
            switch (e.keyCode) {
                case 37:
                    this.isMovingHorizontal = true;
                    this.velocityX = -this.forceX;
                    break;
                case 39:
                    this.isMovingHorizontal = true;
                    this.velocityX = this.forceX;
                    break;
            }
        });

        document.addEventListener("keyup", (e) => {
            switch (e.keyCode) {
                case 37:
                    this.isMovingHorizontal = false;
                    break;
                case 38:
                    this.jumpBehaviour.jump();
                    break;
                case 39:
                    this.isMovingHorizontal = false;
                    break;
                case 79:
                    this.jumpBehaviour = new NormalJumpBehaviour(this);
                    break;
                case 80:
                    this.jumpBehaviour = new ForwardJumpBehaviour(this);
                    break;
            }
        });
    }

    public addVelocityX(amount: number) {
        this.velocityX += amount;
    }

    public addVelocityY(amount: number) {
        this.velocityY += amount;
    }

   public update() {

        // When player doesn't give gas x velocity must zero out.
        if(!this.isMovingHorizontal) {
            this.velocityX *= this.frictionFactorX;
        }

        // Apply gravity so car gets pulled down.
        this.velocityY += this.gravity;

        this.capVelocityY();

        // Apply velocity to position, then translate car by position so it moves.
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

        // Hardcoded border. This is the floor on which the car drives.
        if(this.positionY > 300) {
            this.positionY = 300;
        }

        this.sprite.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px)";
   }

   // Make sure y velocity doesn't get too big.
   private capVelocityY(): void {
        if(this.velocityY < this.maxVelocityYUp) {
            this.velocityY = this.maxVelocityYUp;
        } else if (this.velocityY > this.maxVelocityYDown) {
            this.velocityY = this.maxVelocityYDown;
        }
   }
}