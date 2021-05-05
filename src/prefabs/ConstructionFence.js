//ConstructionFence.js used to spawn a construction fence on all lanes forcing player to jump
class ConstructionFence extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, spawnPos){
        super(scene, game.config.width + fenceWidth, spawnPos, 'constructionFence');

        //properties for house
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.body.setAllowGravity(false);
        this.platPos = spawnPos;

        this.velocity = velocity;
    }

    update(){
        //destroys fence when off screen
        if(this.x < -this.width){
            this.destroy();
        }
    }

    //returns current position of fence for collision checking
    getPlatPos(){
        return(this.platPos);
    }

    //match speed on level up
    matchSpeed() {
        this.setVelocityX(this.velocity*1.2);
    }
}