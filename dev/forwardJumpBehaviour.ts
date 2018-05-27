class ForwardJumpBehaviour implements JumpBehaviour {

    public car: Car;

    constructor(car: Car) {
        this.car = car;
    }

    public jump(): void {
        this.car.addVelocityX(20);
        this.car.addVelocityY(-80);
    }
}