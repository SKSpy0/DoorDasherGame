let config = {
    type: Phaser.AUTO,
    width: 720,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Start, Play, GameOver],
}
let game = new Phaser.Game(config);

//define global variables
let centerHeight = game.config.height/2;
let centerWidth = game.config.width/2;
const coneWidth = 42;
const coneHeight = 42;
const fenceWidth = 63;
const fenceHeight = 85;
const houseWidth = 300;
const houseHeight = 206;
let level;
let highScore;
let newHighScore = false;
let cursors;

//keyboard controls 
let keyUP, keyDOWN, keySPACE;

//Door Dasher created by "Dog Squad"
//Jesse Park (Art & Sound Designer), Timothy Tai (Programmer), William Lee (Programmer)
//Completed 5/4/21
//Creative Tilt: 
//Our game implements three lanes of movement for the character, by creating 3 platforms of where the player can move about
//Taken from Nathan's Paddle Parkour of parent-child obstacle spawning we implemented that to work with our 3 platform system
//Having multiple checks which check the player's platform position and the obstacle's platform position to determine a collision has been made (EX: Play.js, Line 200)
//Our sound design works really well with our game, from our playtests, the testers commented they really enjoyed the sounds of getting hit and completing a delivery, creating a more satisfying experience when playing well