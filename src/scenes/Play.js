class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    init(data){
        this.level = data;
    }

    preload() {
        //loading background assets
        this.load.image('sky', './assets/bgSky.png');
        this.load.image('clouds', './assets/bsClouds.png');
        this.load.image('platform', './assets/road.png');
        this.load.image('road', './assets/bgRoad.png');
        this.load.image('telephoneP', './assets/bgTelephoneP.png');
        this.load.image('trees', './assets/bgTrees.png');
        this.load.image('fence', './assets/bgFence.png');
        this.load.image('background', './assets/Nbackground.png');

        //loading player
        this.load.image('playerSprite', './assets/player.png');

        //load obstacles
        this.load.image('cone','./assets/cone.png');
    }

    create(){
        //adding key inputs
        cursors = this.input.keyboard.createCursorKeys();

        //initialize speed of game
        this.moveSpeed = 1.5;

        //set world gravity
        this.physics.world.gravity.y = 1000;

        //place background
        this.background = this.add.tileSprite(0, 0, 720, 480, 'background').setOrigin(0,0);

        //adding ground platform in the middle of the road
        this.platform = this.physics.add.sprite(0,400, 'platform').setOrigin(0,0);
        this.platform.body.immovable = true;
        this.platform.body.allowGravity = false;

        //placing ground tile in front of the platform
        this.road = this.add.tileSprite(0, 0, 720, 480, 'road').setOrigin(0,0);

        //adding player
        this.player = new Player(this, 100, 100, 'playerSprite').setOrigin(0,0);

        //player cant go off screen
        this.player.setCollideWorldBounds(true);

        //adds cone
        this.cone01 = new Cone(this, game.config.width, 340, 'cone', 0, this.moveSpeed).setOrigin(0,0);

        //turn on collision between player and ground
        this.physics.add.collider(this.player, this.platform);
    }

    update() {
        //scrolls background and road
        this.background.tilePositionX += this.moveSpeed;
        this.road.tilePositionX += this.moveSpeed;

        //updates cone
        this.cone01.update();

        //updates player
        this.player.update();
    }
}