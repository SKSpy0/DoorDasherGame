class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    
    preload(){
        //load assets
        this.load.image('menuBackground', './assets/background.png');
    }

    create(){

        //show menu screen
        this.menuScreen = this.add.sprite(0,0, 'menuBackground').setOrigin(0,0);

        this.add.text(20, 20, "Door Dasher Menu");

        //define keyboard controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //UP key pressed
        keyUP.on('down', () => {
            console.log("up key pressed");
            this.scene.start('playScene');
        });

        //DOWN key pressed
        keyDOWN.on('down', () =>{
            console.log("down key pressed");
        })
    }
}