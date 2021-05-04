//Cone.js uses same structure as Nathan's Paddle Parkour Barrier.js
class Cone extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, platPos) {
        super(scene, game.config.width + coneWidth , platPos, 'cone');

        //setting properties for cone
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.body.setAllowGravity(false);
        this.newCone = true;
        this.platPos = platPos;
    }

    update(){
        //recursive call when cone is half way to spawn more cones
        if(this.newCone && this.x < game.config.width/2){
            this.newCone = false;
            this.scene.addCone(this.parent, this.velocity);
        }

        //destroys cone when off screen
        if(this.x < -this.width){
            this.destroy();
        }
    }

    //returns current position of cone, used in checking collision with player
    getPlatPos() {
        return (this.platPos + coneHeight/2);
    }
}