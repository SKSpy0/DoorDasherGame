class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/background.png');
    }

    create(){
        this.add.text(20, 20, "Door Dasher Play");
        this.background = this.add.tileSprite(0, 0, 720, 480, 'background').setOrigin(0, 0);
    }

    update() {
        this.background.tilePositionX += 2;
    }
}