class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    preload(){
        this.load.image('gameOver', './assets/gameOver.png');
        //this.load.audio('endbgm', './assets/gameOver.mp3');
    }

    create(){
        // check for high score in local browser storage , taken from Nathan's Paddle Parkour
        if(localStorage.getItem('hiscore') != null){
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            //check if current score is higher than stored
            if(level > storedScore){
                console.log('new high score!')
                localStorage.setItem('hiscore', level.toString());
                highScore = level;
                newHighScore = true;
            } else {
                console.log('no new high score...');
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        } else {
            console.log('no high score saved, creating a new one');
            highScore = level;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }

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