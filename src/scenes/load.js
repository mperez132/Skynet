class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload() {
        //Loading assets
        this.load.image('enemy1', './assets/spaceships_008.png');
        this.load.image('playerShip1', './assets/playerShip1_green.png');
        this.load.image('Background', './assets/tempbackground.png');
        this.load.image('trail', './assets/trail.png');
    }


    create() {
        //Then move to menu scene
        this.scene.start('menuScene');
    }
}