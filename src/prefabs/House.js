//House.js is used for setting up delivery points for player to get more deliveries
class House extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity, spawnPos){
        super(scene, game.config.width + houseWidth, spawnPos, 'houseSprite');

        //properites for house
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.body.setAllowGravity(false);
        this.platPos = spawnPos;

        this.velocity = velocity;
    }

    update(){
        //destroys house when off screen
        if(this.x < -this.width){
            this.destroy();
        }
    }
    //returns current position of house, for collision checking
    getPlatPos(){
        return(this.platPos + houseHeight/2);
    }

    //match speed on level up
    matchSpeed() {
        this.setVelocityX(this.velocity*1.2);
    }
}