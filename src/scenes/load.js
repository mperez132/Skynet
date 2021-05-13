class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload() {
        this.load.image('enemy1', './assets/spaceships_008.png');
        this.load.image('playerShip1', './assets/playerShip1_green.png');
        this.load.image('Background', './assets/tempbackground.png');
    }


    create() {
        this.scene.start('menuScene');
    }
}