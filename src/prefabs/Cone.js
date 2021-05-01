//Cone.js uses same structure as Nathan's Paddle Parkour Barrier.js
class Cone extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, platPos) {
        super(scene, game.config.width + coneWidth , platPos, 'cone');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.body.setAllowGravity(false);
        this.newCone = true;
    }

    update(){
        if(this.newCone && this.x < 0){
            this.newCone = false;
            this.scene.addCone(this.parent, this.velocity);
        }

        if(this.x < 0){
            this.destroy();
        }
    }
}