class Player extends Phaser.GameOvjects.Sprite {
    constructor (scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update() {
        
    }


}