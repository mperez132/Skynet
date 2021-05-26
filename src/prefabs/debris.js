class Player extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 3;
    }

    update() {
        this.y += this.movementSpeed;
    }

}