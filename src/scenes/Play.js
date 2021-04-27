class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/background.png');
        this.load.image('playerSprite', './assets/player.png');
        this.load.image('cone','./assets/Cone.png');
    }

    create(){
        this.add.text(20, 20, "Door Dasher Play");
        
        this.background = this.add.tileSprite(0, 0, 720, 480, 'background').setOrigin(0, 0);

        this.player = this.add.sprite(100, 100, 'playerSprite').setOrigin(0,0);

        this.cone = this.add.sprite(100, 150, 'cone').setOrigin(0,0);
    }

    update() {
        this.background.tilePositionX += 2;
    }
}