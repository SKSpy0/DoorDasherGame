console.log("hello");

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scene: [Menu, Play, GameOver],
}
let game = new Phaser.Game(config);
