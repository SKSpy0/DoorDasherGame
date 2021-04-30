class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.enableBody(true, x, y, true, true);
        this.acceleration = 1000;
        this.drag = 3000;
    }

    update() {
        if(cursors.left.isDown) {
            this.body.setAccelerationX(-this.acceleration);
        } else if(cursors.right.isDown) {
            this.body.setAccelerationX(this.acceleration);
        } else {
            this.body.setAccelerationX(0);
            this.body.setDragX(this.drag);
        }
    }
}