class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    
    create(){
        this.add.text(640, 360, "Door Dasher Menu");
    }
}