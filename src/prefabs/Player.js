class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        // Adds physics elements to player
        scene.physics.add.existing(this);
        
        // Adds player to scene
        this.scene.add.existing(this);

        // Set initial values
        this.acceleration = 300;
        this.drag = 4000;
        this.jump = -500;
        this.maxXVelocity = 200;
        this.maxYvelocity = 5000;
        this.setMaxVelocity(this.maxXVelocity, this.maxYvelocity);
        this.platform = "middle";
        this.gravity = 400;
        this.setGravity(0, this.gravity);
    }

    update() {
        if(cursors.left.isDown) {
            // Move left
            if(this.body.touching.down) {
                this.body.setAccelerationX(-this.acceleration);
            }
            // Lets you jump while holding left
            if(this.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.space)) {
                this.body.setVelocityY(this.jump);
            }
        } else if(cursors.right.isDown) {
            // Move right
            if(this.body.touching.down) {
                this.body.setAccelerationX(this.acceleration);
            }
            // Lets you jump while holding right
            if(this.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.space)) {
                this.body.setVelocityY(this.jump);
            }
        } else if(this.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.space)) {
            // Jump
            this.body.setVelocityY(this.jump);
        } else {
            // Slow down
            this.body.setAccelerationX(0);
            this.body.setDragX(this.drag);
        }

        // Makes it so you jump a fixed amount
        if(!this.body.touching.down) {
            this.body.setVelocityX(0);
            this.body.setVelocityX(50);
        }
       
        // Switching platforms
        if(this.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            if(this.platform == "lower") {
                this.platform = "middle";
                this.y-=75;
            } else if(this.platform == "middle") {
                this.platform = "upper";
                this.y-=75;
            }
        }
        if(this.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.down)) {
            if(this.platform == "upper") {
                this.platform = "middle";
                this.y+=75;
            } else if(this.platform == "middle") {
                this.platform = "lower";
                this.y+=75;
            }
        }
    }

    // Checks what platform the player is on
    currentPlatform() {
        return this.platform;
    }

    currentPlatformY() {
        if(this.platform == "middle") {
            return (400);
        } else if (this.platform == "upper") {
            return (325);
        } else {
            return (475);
        }
    }

    // Adjust jumping based on speed of the game
    nextLevel() {
        this.setGravity(0, this.gravity *2.5);
        this.jump *= 1.1;
    }
}