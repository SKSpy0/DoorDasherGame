class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    preload(){
        this.load.image('gameOver', './assets/gameOver.png');
        //this.load.audio('endbgm', './assets/gameOver.mp3');
    }

    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        /*
        this.startbgm = this.sound.add('startbgm', {
            loop:true,
            volume: 0.5
        });
        */
        this.add.tileSprite(0, 0, 720, 480, 'gameOver').setOrigin(0,0);
    }
}