class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
        this.coneCollided = false;
        this.carCollided = false;
        this.holeCollided = false;
        this.constructFenceCollided = false;
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
        //set parameters
        this.moveSpeed = 2.5;
        this.obstacleSpeed = -400;

        //set world gravity
        this.physics.world.gravity.y = 1000;

        //place background
        this.background = this.add.tileSprite(0, 0, 720, 480, 'background').setOrigin(0,0);

        //adding ground platform in the middle, upper, and lower section of the road y=400px, 325px, 475px
        this.middlePlatform = this.physics.add.sprite(0,400, 'platform').setOrigin(0,0);
        this.middlePlatform.body.immovable = true;
        this.middlePlatform.body.allowGravity = false;
        this.upperPlatform = this.physics.add.sprite(0,325, 'platform').setOrigin(0,0);
        this.upperPlatform.body.immovable = true;
        this.upperPlatform.body.allowGravity = false;
        this.lowerPlatform = this.physics.add.sprite(0,475, 'platform').setOrigin(0,0);
        this.lowerPlatform.body.immovable = true;
        this.lowerPlatform.body.allowGravity = false;

        //placing ground tile in front of the platform
        this.road = this.add.tileSprite(0, 0, 720, 480, 'road').setOrigin(0,0);

        //creating player and setting bounds
        this.player = new Player(this, 100, 280, 'playerSprite').setOrigin(0,0);
        this.player.setCollideWorldBounds(true);
        this.player.depth = 1;

        // set up each obstacle group (cone, manhole, car, construction fence)
        this.coneGroup = this.add.group({
            runChildUpdate: true
        });
        //wait a bit before spawning obstacles (type: cone = 0, manhole = 1, car = 2, construct fence = 3)
        this.time.delayedCall(1000, () => {
            this.addCone();
        })

        //turn on collision between player and platform (intial: middle platform)
        this.middle = this.physics.add.collider(this.player, this.middlePlatform);
        this.upper = this.physics.add.collider(this.player, this.upperPlatform);
        this.lower = this.physics.add.collider(this.player, this.lowerPlatform);
        this.middle.active = true;
        this.upper.active = false;
        this.lower.active = false;


        //adding key inputs
        cursors = this.input.keyboard.createCursorKeys();
    }
    
    // creates new obstacles and add them to the respective group
    // obstacle group implementation was taken from Nathan Altice's Paddle Parkour
    addCone(){
        //(0 = middle, 1 = upper, 2 = lower)
        let ranConePos = Math.floor(Math.random() * 3);
        //used for spawning cone
        let spawnPos;
        if(ranConePos == 0){
            spawnPos = 400;
        } else if(ranConePos == 1){
            spawnPos = 325;
        } else {
            spawnPos = 475;
        }
        let cone = new Cone(this, this.obstacleSpeed, spawnPos - coneHeight/2);
        //adds collision check if player and cone are on the same y value
        this.physics.add.overlap(this.player, cone, (player, cone) => {
            if(cone.getPlatPos() == player.currentPlatformY()) {
                this.coneCollided = true;
            }
        });
        this.coneGroup.add(cone);
    }

    update() {
        //scrolls background and road
        this.background.tilePositionX += this.moveSpeed;
        this.road.tilePositionX += this.moveSpeed;

        //updates player
        this.player.update();

        //if player is still alive
        if(!this.player.destroyed){
            if(this.coneCollided){
                console.log("collided with cone")
            }
        }
        this.coneCollided = false;

        //updates platform
        if (this.player.currentPlatform() == "middle") {
            this.middle.active = true;
            this.upper.active = false;
            this.lower.active = false;
        } else if(this.player.currentPlatform() == "upper") {
            this.middle.active = false;
            this.upper.active = true;
            this.lower.active = false;
        } else {
            this.middle.active = false;
            this.upper.active = false;
            this.lower.active = true;
        }
    }
}