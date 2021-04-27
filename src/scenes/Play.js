class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create(){
        this.add.text(640, 360, "Door Dasher Play");
    }
}