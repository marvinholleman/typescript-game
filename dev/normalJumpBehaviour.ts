class NormalJumpBehaviour implements JumpBehaviour {

    public car: Car;

    constructor(car: Car) {
        this.car = car;
    }

    public jump(): void {
        this.car.addVelocityY(-80);
    }
}