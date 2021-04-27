class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    
    create(){
        this.add.text(20, 20, "Door Dasher Menu");

        //define keyboard controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
        //UP key pressed
        keyUP.on('down', () => {
            console.log("up key pressed");
        });

        //DOWN key pressed
        keyDOWN.on('down', () =>{
            console.log("down key pressed");
        })
    }
}