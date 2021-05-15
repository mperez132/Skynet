class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload() {
        //Loading assets
        this.load.image('ShipPlayer', './assets/playerShip1.png');
        this.load.image('Background', './assets/tempbackground.png');
        this.load.image('shipTrail', './assets/trail.png');

        //loading sound
        this.load.audio('musicBackground','./assets/Backfill.mp3')
        this.load.audio('musicStart','./assets/Start_Tone.mp3')
    }


    create() {
        //Then move to menu scene
        this.scene.start('menuScene');
    }
}