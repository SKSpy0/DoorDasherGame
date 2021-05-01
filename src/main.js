let config = {
    type: Phaser.AUTO,
    width: 720,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play, GameOver],
}
let game = new Phaser.Game(config);

//define global variables
let centerHeight = game.config.height/2;
let centerWidth = game.config.width/2;
const coneWidth = 42;
const coneHeight = 42;
let level;
let cursors;

//keyboard controls 
let keyUP, keyDOWN;