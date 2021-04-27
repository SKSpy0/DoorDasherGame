console.log("hello");

let config = {
    type: Phaser.CANVAS,
    width: 720,
    height: 480,
    scene: [Menu, Play, GameOver],
}
let game = new Phaser.Game(config);