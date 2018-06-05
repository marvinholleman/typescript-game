class RifleBullet extends Bullet {
    constructor(x: number, y: number, parent: HTMLElement, side: number, tank: Tank) {
        super(x + 10, y - 0, 'bullet', parent, side, tank);
    }
}