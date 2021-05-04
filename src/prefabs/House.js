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
        this.newHouse = true;
        this.platPos = spawnPos;
    }

    //returns current position of house
    getPlatPos(){
        return(this.platPos + houseHeight/2);
    }
}