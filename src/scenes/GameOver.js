class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    create(){
        this.add.text(640, 360, "Door Dasher Game Over");
    }
}