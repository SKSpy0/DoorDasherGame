class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    create(){
        this.add.text(20, 20, "Door Dasher Game Over");
    }
}