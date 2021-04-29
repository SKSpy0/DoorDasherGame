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
        //initialize speed of game
        this.moveSpeed = 1.5;

        this.ACCELERATION = 1000;
        this.DRAG = 2000;
        this.physics.world.gravity.y = 1000;

        //place background
        this.background = this.add.tileSprite(0, 0, 720, 480, 'background').setOrigin(0,0);

        this.player = this.physics.add.sprite(100, 100, 'playerSprite').setOrigin(0,0);
        this.player.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.ground);

        //adds cone
        this.cone01 = new Cone(this, game.config.width, 400, 'cone', 0, this.moveSpeed).setOrigin(0,0);
    }

    update() {
        //scrolls background
        this.background.tilePositionX += this.moveSpeed;

        //updates cone
        this.cone01.update();

        if(cursors.left.isDown) {
            this.player.body.setAccelerationX(-this.ACCELERATION);
        } else if(cursors.right.isDown) {
            this.player.body.setAccelerationX(this.ACCELERATION);
        } else {
            this.player.body.setAccelerationX(0);
            this.player.body.setDragX(this.DRAG);
        }
    }
}