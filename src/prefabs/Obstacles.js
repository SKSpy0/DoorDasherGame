class Obstacles extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture);

        //add to scene
        scene.add.existing(this);
    }

    update(){
        
    }

}