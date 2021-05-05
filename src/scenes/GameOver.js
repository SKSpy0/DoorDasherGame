class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    preload(){
        this.load.image('gameOver', './assets/gameOver.png');
        this.load.audio('endbgm', './assets/gameOverNoise.mp3');
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

        //fade in transition
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        //play game over music
        this.endbgm = this.sound.add('endbgm', {
            loop:false,
            volume: 0.5
        });
        this.endbgm.play();
        //display game over image
        this.add.tileSprite(0, 0, 720, 480, 'gameOver').setOrigin(0,0);

        //display restart text after 5 seconds
        this.time.delayedCall(5000, () => {
            this.add.text(centerWidth, centerHeight+200, 'Press UP to Restart', { fontFamily: 'CustomFont', fontSize: '20px', color: 'red'}).setOrigin(0.5);
            this.add.text(centerWidth, centerHeight-200, 'Score:', { fontFamily: 'CustomFont', fontSize: '20px', color: 'red'}).setOrigin(0.5);
            this.add.text(centerWidth+33, centerHeight-211, level, { fontFamily: 'CustomFont', fontSize: '20px', color: 'red'}).setOrigin(0,0);
            if (newHighScore == true) {
                this.add.text(centerWidth, centerHeight-150, 'NEW! High Score:', { fontFamily: 'CustomFont', fontSize: '20px', color: 'red'}).setOrigin(0.5);
                this.add.text(centerWidth+85, centerHeight-161, highScore, { fontFamily: 'CustomFont', fontSize: '20px', color: 'red'}).setOrigin(0,0);
            } else {
                this.add.text(centerWidth, centerHeight-150, 'High Score:', { fontFamily: 'CustomFont', fontSize: '20px', color: 'red'}).setOrigin(0.5);
                this.add.text(centerWidth+55, centerHeight-161, highScore, { fontFamily: 'CustomFont', fontSize: '20px', color: 'red'}).setOrigin(0,0);
            }
		});
        //restart with up key
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyPressed = false;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP) && this.keyPressed == false) {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.endbgm.pause();
            this.keyPressed = true;
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('startScene');
            });
        }
    }
}