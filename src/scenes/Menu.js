class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    
    preload(){
        //load assets
        this.load.image('sky', './assets/bgSky.png');
        this.load.image('clouds', './assets/bsClouds.png');
        this.load.image('road', './assets/bgRoad.png');
        this.load.image('telephoneP', './assets/bgTelephoneP.png');
        this.load.image('trees', './assets/bgTrees.png');
        this.load.image('fence', './assets/bgFence.png');
    }

    create(){

        //high score
        let level = {
            highest: 0
        };

        //add background assets
        this.sky = this.add.tileSprite(0, 0, 720, 480, 'sky').setOrigin(0,0);
        this.clouds = this.add.tileSprite(0, 0, 720, 480, 'clouds').setOrigin(0,0);
        this.trees = this.add.tileSprite(0, 0, 720, 480, 'trees').setOrigin(0,0);
        this.telephoneP = this.add.tileSprite(0, 0, 720, 480, 'telephoneP').setOrigin(0,0);
        this.fence = this.add.tileSprite(0, 0, 720, 480, 'fence').setOrigin(0,0);
        this.road = this.add.tileSprite(0, 0, 720, 480, 'road').setOrigin(0,0);

        //add title text
        this.add.text(centerWidth, centerHeight-75, 'Door Dasher', { fontFamily: 'CustomFont', fontSize: '90px', color: 'red'}).setOrigin(0.5);
        this.add.text(centerWidth, centerHeight, 'Press UP to Start', { fontFamily: 'CustomFont', fontSize: '20px', color: 'red'}).setOrigin(0.5);

        //define keyboard controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //UP key pressed
        keyUP.on('down', () => {
            this.scene.start('playScene', level);
        });

        //DOWN key pressed
        keyDOWN.on('down', () =>{
        })
    }

    update() {
        //parallax scrolling background
        this.road.tilePositionX += 0.5;
        this.fence.tilePositionX += 0.5;
        this.telephoneP.tilePositionX += 0.2;
        this.trees.tilePositionX += 0.1;
        this.clouds.tilePositionX +=0.05;
    }
}