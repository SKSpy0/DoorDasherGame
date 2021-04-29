class Cone extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, moveSpeed){
        super(scene, x, y, texture, moveSpeed);

        //add to scene
        scene.add.existing(this);

        //stores movespeed value
        this.moveSpeed = moveSpeed;
    }

    update(){
        //moves cone right
        this.x += this.moveSpeed;

        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    increaseSpeed(moveSpeed){
        this.moveSpeed = moveSpeed;
    }
}