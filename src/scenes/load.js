class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload() {
        //Loading assets
        this.load.image('ShipPlayer', './assets/playerShip1.png');
        this.load.image('Background', './assets/tempbackground.png');
        this.load.image('shipTrail', './assets/trail.png');
    }


    create() {
        //Then move to menu scene
        this.scene.start('menuScene');
    }
}