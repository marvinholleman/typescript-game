<del># Parallax car
Drive with left&right arrows. You can jump with up arrow. Switch between different jump modes with 'o' and 'p' keys.</del>

# The game
[Click to play the game](https://dafkas.github.io/typescript-game/)

Use Arrows to drive left and right. Fire bullets or rockets with space bar and switch between them with O and P. Kill all the soldiers, but check out your gas and health, because the game is over if you're out of gas or health. Use the gas powerUp to refill the gass. 

Sometimes the enemy fires a nuke and does some damage to everyone in the game. 

# Pull request
Configured basic project. Configs where not okay to clone successfully. Removed Package.json and Webpack.config.js from Gitignore file. Made a new Webpack file to build the files & added package.json file so the node modules could be installed.

Because I couldnt get the project running on my laptop I couldnt add some OO principles. Wasted a lot of time on fixxing the project running on my laptop.

link : https://github.com/jurrianlammerts/Spaceinvaders 

Made a second pull request to show OO principle
Added sounds in Game and Alien, made them both private because theire only be used in their own class.

link : https://github.com/jurrianlammerts/Spaceinvaders/pull/3

# Peer review
I'm making the peer review for Jurrian again, because where doing it with three, Joey gives me a review, I do Jurrian and Jurrian does Joey. 

I see al the OOP principles back in the game, except for the Observer pattern. I think that is because it was last week we had the lesson about the Observer. 

Link : https://github.com/jurrianlammerts/Spaceinvaders/issues/4

# OO Principles
## Singleton
Used a singleton to initialize the game. If the instance is not existing, it will make an object or return the existing object.

        public static getInstance() {
                if (!Game.instance)
                    Game.instance = new Game();
                return Game.instance;
        }

## Observer
The observer pattern is used to notify the tank and all the soldiers. If the object is notified they do some damage. The subject is a nuke that sends the notify if it hits the ground.

        interface Subject {
            observers: Observer[];
            subscribe(c: Observer): void;
            unsubscribe(c: Observer): void;
            sendMessage(): void;
        }
        
        interface Observer {
            notify(p: string): void;
        }
        
        //soldier notify
        notify(p: string) {
            console.log('atom dropped on soldier');
            this.reduceHealth();
        }
        //tank notify
        notify(p: string) {
            this.reduceHealth(1.2);
            console.log('atom dropped on tank');
        }
## Strategy
To make use of the different weapons, i've implemented the strategy pattern. It is possible to switch between weapons with O and P. If P is pressed you can fire rockets and with O u switch back to normal bullets.

        //set the weaponstrategy and fire on spacebar
        document.addEventListener("keyup", (e) => {
            switch (e.keyCode) {
                case 37:
                    this.isMovingHorizontal = false;
                    break;
                case 32:
                    this.activeWeaponStrategy.fire(this.side);
                    break;
                case 39:
                    this.isMovingHorizontal = false;
                    break;
                case 79:
                    this.activeWeaponStrategy = this.rifle;
                    break;
                case 80:
                    this.activeWeaponStrategy = this.rocketLauncher;
                    break;
            }
        });
        
        //weaponstrategy
        interface WeaponStrategy {
            tank: Tank;
            fire(side: number): void;
        }
        
        //rocketlauncher fire method
        public fire(side: number): void {
            this.tank.bullets.push(new RocketBullet(this.tank.positionX, this.tank.positionY, this.parent, side, this.tank))
            document.getElementsByTagName('rocketCount')[0].innerHTML = "Rockets " + this.rocketBulletCounter--;
        }
        
        //rifle fire method
        public fire(side: number): void {
            this.tank.bullets.push(new RifleBullet(this.tank.positionX, this.tank.positionY, this.parent, side, this.tank))
            document.getElementsByTagName('bulletCount')[0].innerHTML = "Bullets " + this.bulletCounter--;
            if (this.bulletCounter < 1) {
               this.level.bulletCount = 0; 
            }
         }

## Polymorphism
Polymorpism is implemented on several ways. I've used AmmoObjects so a bullet can be a rocket or a riflebullet. The rocketbullet and riflebullet both extend from bullet. Because the rocket has some velocity i've made a new move() function in the rocketbullet class. When using this u can override the current method. When calling the super method the're the element will be created in the DOM.

        //bullet class extends from AmmoObject
        class Bullet extends AmmoObject {

            protected speedX: number = 4;
            protected speedY: number;

            private posx: number;
            protected side: number;
            private tank: Tank;

            private posX: number;
            private posY: number;
            private parent: HTMLElement;

            public bullets: Array<Bullet> = [];

            constructor(x: number, y: number, elementName: string, parent: HTMLElement, side: number, tank: Tank) {
                super(x + 50, y - 55, elementName, 5, 5, parent);
                // this.tank = tank;
                this.posX = x;
                this.posY = y;
                this.parent = parent;
                this.side = side;
                this.tank = tank;
            }

            public move(maxWidth: number, maxHeight: number) {
                this.x += this.speedX;
                if (this.side == -1) {
                    this.speedX = -4;
                }

                this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";

                if (this.x > maxWidth) {
                    this.remove();
                }
            }

            public hitsEnemy(soldier: Soldier): boolean {

                return (this.x < soldier.x + soldier.width &&
                    this.x + this.width > soldier.x &&
                    this.y < soldier.y + soldier.height);
            }


        }


        //riflebullet class
        class RifleBullet extends Bullet {

            public rifle: Rifle;

            constructor(x: number, y: number, parent: HTMLElement, side: number, tank: Tank) {
                super(x + 10, y - 0, 'bullet', parent, side, tank);
            }
        }
        
        //rocketbullet class
        class RocketBullet extends Bullet {

            constructor(x: number, y: number, parent: HTMLElement, side: number, tank: Tank) {
                super(x + 10, y - 27, 'rocket', parent, side, tank);

                this.speedY = -8;

                console.log(this.width);
            }

            public move(maxWidth: number, maxHeight: number) {
                this.x += this.speedX;

                if (this.side == -1) {
                    this.speedX = -4;
                }

                this.speedY *= 1.02;
                this.speedY += 0.2;

                this.y += this.speedY;


                this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
                //console.log(this.y);
                if (this.x > maxWidth || this.y > 0) {
                    this.remove();
                }
            }

            public hitsEnemy(soldier: Soldier): boolean {
                this.width = 200;
                this.height = 50;
                return (this.x < soldier.x + soldier.width &&
                    this.x + this.width > soldier.x &&
                    this.y + this.height > soldier.y &&
                    this.y < soldier.y + soldier.height);
            }
        }
        
Every ammoObject needs to be fired and move over the screen. Because it is used this way, it is possible to call the move method in the bullet class. This is an efficient way so you don't have to basically write the same code twice. 

            this.tank.bullets.forEach((bullet, j) => {
                bullet.move(this.width + 85, this.height);
                this.soldiers.forEach((soldier, i) => {
                    if (bullet.hitsEnemy(soldier)) {
                        soldier.reduceHealth();
                        this.tank.bullets.splice(j, 1);
                        if (soldier.outOfHealth()) this.soldiers.splice(i, 1)
                        bullet.remove();
                    }
                });
            });

This way is also used to move powerUps and check the collisition with the tank.
        
           this.powerUps.forEach((powerUp, p) => {
                powerUp.move(this.height);
                if (powerUp.hitsTank(this.tank.positionX)) {
                    this.tank.refillGas();
                    this.powerUps.splice(p, 1)
                    powerUp.remove();
                }
            });

# UML - Diagram

![alt text](/docs/img/UML_game.png)

# Game components
Used sounds for the music, firing a bullet, when the nuke hits the ground and when the soldier dies. 

Used nice sprites for the characters and the tank. I also added some game control images in the starter interface.
