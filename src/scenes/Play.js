class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    init(data){
        this.level = data;
    }

    preload() {
        //load background
        this.load.image('background', './assets/background.png');

        //load player
        this.load.image('playerSprite', './assets/player.png');

        //load obstacles
        this.load.image('cone','./assets/Cone.png');
    }

    create(){
        //place background
        this.background = this.add.tileSprite(0, 0, 720, 480, 'background').setOrigin(0, 0);

        //place player
        this.player = this.add.sprite(100, 100, 'playerSprite').setOrigin(0,0);
        
        
        this.cone = this.add.sprite(100, 150, 'cone').setOrigin(0,0);
    }

    update() {
        this.background.tilePositionX += 2;
    }
}