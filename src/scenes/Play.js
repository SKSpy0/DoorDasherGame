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

        //loading player
        this.load.image('playerSprite', './assets/player.png');

        //load obstacles
        this.load.image('cone','./assets/Cone.png');
    }

    create(){
        // Movement/world Physics
        this.ACCELERATION = 1000;
        this.DRAG = 2000;
        this.physics.world.gravity.y = 1000;

        // Adding Background
        this.sky = this.add.tileSprite(0, 0, 720, 480, 'sky').setOrigin(0,0);
        this.clouds = this.add.tileSprite(0, 0, 720, 480, 'clouds').setOrigin(0,0);
        this.trees = this.add.tileSprite(0, 0, 720, 480, 'trees').setOrigin(0,0);
        this.telephoneP = this.add.tileSprite(0, 0, 720, 480, 'telephoneP').setOrigin(0,0);
        this.fence = this.add.tileSprite(0, 0, 720, 480, 'fence').setOrigin(0,0);

        // Adding ground platform in the middle of the road
        this.platform = this.physics.add.sprite(0,400, 'platform').setOrigin(0,0);
        this.platform.body.immovable = true;
        this.platform.body.allowGravity = false;

        // Placing ground tile in front of the platform
        this.road = this.add.tileSprite(0, 0, 720, 480, 'road').setOrigin(0,0);


        // Adding player
        this.player = this.physics.add.sprite(100, 100, 'playerSprite').setOrigin(0,0);
        this.player.setCollideWorldBounds(true);

        this.cone = this.add.sprite(100, 150, 'cone').setOrigin(0,0);

        // Turn on collision between player and ground
        this.physics.add.collider(this.player, this.platform);

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
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