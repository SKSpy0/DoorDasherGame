class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
        //bool for collisions
        this.coneCollided = false;
        this.carCollided = false;
        this.fenceCollided = false;

        //for current level number
        this.currentlevel = 0;
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
        // this.load.image('playerSprite', './assets/player.png');
        this.load.spritesheet('playerSprite', './assets/RunS.png', {frameWidth: 96, frameHeight: 176});

        //load house asset
        this.load.image('houseSprite', './assets/house.png');
        this.load.image('deliveredHouse', './assets/deliveredhouse.png');

        //load obstacles
        this.load.image('cone','./assets/cone.png');
        this.load.image('constructionFence', './assets/Rbarricade.png');
    }

    create(){
        //add transition effect
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        
        //set parameters
        this.moveSpeed = 2.25;
        this.obstacleSpeed = -200;
        this.obstacleSpeedMax = -500;
        this.deliveryNum = 0;

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

        //ui text
        let uiConfig = {
            fontFamily: 'CustomFont',
            fontSize: '26px',
            color: 'red',
        }

        // setting up number of deliveries
        this.add.text(10, 10, "Completed Deliveries:", uiConfig).setOrigin(0,0);
        this.deliveryNumText = this.add.text(275, 10, this.deliveryNum, uiConfig).setOrigin(0,0);
        
        //creating player and setting bounds
        this.anims.create({
            key: 'run',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('playerSprite', { start: 0, end: 3 }),
        });
        this.player = new Player(this, 100, 200, 'playerSprite').setOrigin(0,0);
        this.player.setCollideWorldBounds(true);
        this.player.depth = 1;

        // set up each obstacle group (cone, construction fence, house)
        this.coneGroup = this.add.group({
            runChildUpdate: true
        });
        this.fenceGroup = this.add.group({
            runChildUpdate: true
        });
        this.houseGroup = this.add.group({
            runChildUpdate: true
        });

        //wait a bit before spawning objects
        this.time.delayedCall(3000, () => {
            this.addCone();
        })
        this.time.delayedCall(1000, () => {
            this.createHouse();
        })

        //turn on collision between player and platform (intial: middle platform)
        this.middle = this.physics.add.collider(this.player, this.middlePlatform);
        this.upper = this.physics.add.collider(this.player, this.upperPlatform);
        this.lower = this.physics.add.collider(this.player, this.lowerPlatform);
        this.middle.active = true;
        this.upper.active = false;
        this.lower.active = false;

        //loop house calls
        this.houseSpawnTimer = this.time.addEvent({
            delay: 15000,
            callback: this.createHouse,
            callbackScope: this,
            loop: true
        });

        //loop fence calls
        this.fenceSpawnTimer = this.time.addEvent({
            delay: 8000,
            callback: this.addFence,
            callbackScope: this,
            loop: true
        });

        //adding key inputs
        cursors = this.input.keyboard.createCursorKeys();
    }
    
    // creates the delivery house
    createHouse(){
        let house = new House(this, this.obstacleSpeed, 325 - houseHeight/2);
        let firstCol = false;
        this.physics.add.overlap(this.player, house, (player, house) => {
            if(house.getPlatPos() == player.currentPlatformY() && !firstCol){
                console.log("collided with house");
                this.levelIncrease();
                house.setTexture('deliveredHouse')
                firstCol = true;
            }
        });
        this.houseGroup.add(house);
    }

    // creates new obstacles and add them to the respective group
    // obstacle group implementation was taken from Nathan Altice's Paddle Parkour
    addCone(){
        //(0 = middle, 1 = upper, 2 = lower)
        let ranPos = Math.floor(Math.random() * 3);
        //used for spawning cone and will spawn on 0 = middle, 1 = lower, 2 = upper
        let spawnPos
        if(ranPos == 0){
            spawnPos = 400;
        } else if(ranPos == 1) {
            spawnPos = 475;
        } else {
            spawnPos = 325;
        }

        let cone = new Cone(this, this.obstacleSpeed, spawnPos - coneHeight/2);
        //adds collision check if player and cone are on the same y value
        this.physics.add.overlap(this.player, cone, (player, cone) => {
            if(cone.getPlatPos() == player.currentPlatformY()) {
                this.coneCollided = true;
                cone.destroy();
            }
        });
        this.coneGroup.add(cone);
    }
    
    addFence(){
        //fence will spawn on all rows
        let fence01 = new ConstructionFence(this, this.obstacleSpeed, 325);
        this.physics.add.overlap(this.player, fence01, (player, fence01) => {
            if(fence01.getPlatPos() == player.currentPlatformY()){
                this.fenceCollided = true;
                fence01.destroy();
            }
        });
        let fence02 = new ConstructionFence(this, this.obstacleSpeed, 400);
        this.physics.add.overlap(this.player, fence02, (player, fence02) => {
            if(fence02.getPlatPos() == player.currentPlatformY()){
                this.fenceCollided = true;
                fence02.destroy();
            }
        });
        let fence03 = new ConstructionFence(this, this.obstacleSpeed, 475);
        this.physics.add.overlap(this.player, fence03, (player, fence03) => {
            if(fence03.getPlatPos() == player.currentPlatformY()){
                this.fenceCollided = true;
                fence03.destroy();
            }
        });
        this.fenceGroup.add(fence01);
        this.fenceGroup.add(fence02);
        this.fenceGroup.add(fence03);
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
                this.cameras.main.shake(100, 0.0035);
            }
            if(this.fenceCollided){
                console.log("collided with fence");
                this.cameras.main.shake(100, 0.0035);
            }
        }
        this.coneCollided = false;
        this.fenceCollided = false;

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

    //simple level increase from Nathan's Paddle Parkour
    levelIncrease(){
        //increment level
        this.currentlevel++;
        if(this.currentlevel > 0){
            console.log(this.currentlevel);
            //make sure the obstacle speed doesn't increase too much
            if(this.obstacleSpeed >= this.obstacleSpeedMax){
                this.obstacleSpeed *= 1.2;
                this.moveSpeed *= 1.2;
            }
            //increments the delivery number text
            this.deliveryNum++;
            this.deliveryNumText.text = this.deliveryNum;
            //adjust the player jump
            this.player.nextLevel();
        }
    }
}