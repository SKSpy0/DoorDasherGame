class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    preload(){
        this.load.image('gameOver', './assets/gameOver.png');
        this.load.audio('endbgm', './assets/gameOverNoise.mp3');
    }

    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.endbgm = this.sound.add('endbgm', {
            loop:false,
            volume: 0.5
        });
        this.endbgm.play();
        this.add.tileSprite(0, 0, 720, 480, 'gameOver').setOrigin(0,0);

        this.time.delayedCall(5000, () => {
            this.add.text(centerWidth, centerHeight+200, 'Press UP to Restart', { fontFamily: 'CustomFont', fontSize: '20px', color: 'red'}).setOrigin(0.5);
		})
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