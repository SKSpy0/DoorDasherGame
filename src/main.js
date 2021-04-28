let config = {
    type: Phaser.CANVAS,
    width: 720,
    height: 480,
    scene: [Menu, Play, GameOver],
}
let game = new Phaser.Game(config);

//set UI Sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let centerHeight = game.config.height/2;
let centerWidth = game.config.width/2;

//keyboard controls 
let keyUP, keyDOWN;