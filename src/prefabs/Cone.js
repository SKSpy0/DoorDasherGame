class Cone extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, moveSpeed){
        super(scene, x, y, texture, frame);

        //add to scene
        scene.add.existing(this);

        //stores movespeed value
        this.moveSpeed = moveSpeed;
    }

    update(){
        //moves cone left
        this.x -= this.moveSpeed;
    }

    increaseSpeed(moveSpeed){
        this.moveSpeed = moveSpeed;
    }
}