class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        // Adds physics elements to player
        scene.physics.add.existing(this);
        
        // Adds player to scene
        this.scene.add.existing(this);

        // Set initial values
        this.acceleration = 700;
        this.drag = 4000;
        this.jump = -500;
        this.maxXVelocity = 500;
        this.maxYvelocity = 5000;
        this.setMaxVelocity(this.maxXVelocity, this.maxYvelocity);
    }

    update() {
        if(cursors.left.isDown) {
            this.body.setAccelerationX(-this.acceleration);
            // Lets you jump while holding left
            if(this.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
                this.body.setVelocityY(this.jump);
            }
        } else if(cursors.right.isDown) {
            this.body.setAccelerationX(this.acceleration);
            // Lets you jump while holding right
            if(this.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
                this.body.setVelocityY(this.jump);
            }
        } else if(this.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.body.setVelocityY(this.jump);
        } else {
            this.body.setAccelerationX(0);
            this.body.setDragX(this.drag);
        }
    }
}