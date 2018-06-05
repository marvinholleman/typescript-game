interface WeaponStrategy {
    tank: Tank;
    fire(side: number): void;
}