class Start extends Phaser.Scene{
    constructor(){
        super("startScene");
    }
    preload(){
        //load assets
        this.load.image('sky', './assets/bgSky.png');
        this.load.image('clouds', './assets/bsClouds.png');
        this.load.image('road', './assets/bgRoad.png');
        this.load.image('telephoneP', './assets/bgTelephoneP.png');
        this.load.image('trees', './assets/bgTrees.png');
        this.load.image('pizzeria', './assets/pizzeria.png');

        this.load.audio('startbgm', './assets/DoorDasher2_BeepBox_FullSong.mp3');

        this.load.spritesheet('noticeSprite', './assets/NoticeS.png', {frameWidth: 48, frameHeight: 68});
        this.load.spritesheet('idleSprite', './assets/IdleS.png', {frameWidth: 48, frameHeight: 68});
    }
    create() {
        //fade in transition
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.startbgm = this.sound.add('startbgm', {
            loop:true,
            volume: 0.5
        });
        //add background assets
        this.add.tileSprite(0, 0, 720, 480, 'sky').setOrigin(0,0);
        this.add.tileSprite(0, 0, 720, 480, 'clouds').setOrigin(0,0);
        this.add.tileSprite(0, 0, 720, 480, 'trees').setOrigin(0,0);
        this.add.tileSprite(0, 0, 720, 480, 'telephoneP').setOrigin(0,0);
        this.add.tileSprite(140, centerHeight-20, 280, 206, 'pizzeria').setOrigin(0.5);
        this.add.tileSprite(0, 0, 720, 480, 'road').setOrigin(0,0);

        //add player animation
        this.idleplayer = this.add.sprite(140, centerHeight+30, 'idleSprite', 0).setOrigin(0,0);

        //create and start idle animation
        this.anims.create({
            key: 'idle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('idleSprite', { start: 0, end: 3 }),
        });
        this.idleplayer.anims.play('idle', true);

        //switch animation to notice
        this.idleplayer.setTexture('noticeSprite');
        this.anims.create({
            key: 'notice',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('noticeSprite', { start: 0, end: 3 }),
        });
        this.time.delayedCall(2500, () => {
            this.idleplayer.anims.play('notice', true);
		})

        this.startbgm.play();

        //end cutscene
        this.time.delayedCall(5000, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
		})
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('playScene', level);
        })


    }
}