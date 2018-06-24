# Parallax car
Drive with left&right arrows. You can jump with up arrow. Switch between different jump modes with 'o' and 'p' keys.

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

<addr>
    public static getInstance() {
        if (!Game.instance)
            Game.instance = new Game();
        return Game.instance;
    }
</addr>
## Observer
## Strategy
## Polymorphism
# UML - Diagram

![alt text](/docs/img/UML_game.png)


