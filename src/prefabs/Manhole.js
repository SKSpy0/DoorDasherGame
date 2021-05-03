class Manhole extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, platPos) {
        super(scene, game.config.width + holeWidth, platPos, 'manhole');

        //properties for manhole
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.body.setAllowGravity(false);
        this.newHole = true;
        this.platPos = platPos;
    }

    update(){
        //recursive call when manhole is half way to spawn more manholes
        if(this.newHole && this.x < game.config.width/2){
            this.newHole = false;
            this.scene.addManhole(this.parent, this.velocity);
        }

        //destroys manhole when off screen
        if(this.x < -this.width){
            this.destroy();
        }
    }

    //returns current position of manhole, used in checking collision with player
    getPlatPos(){
        return(this.platPos);
    }
}