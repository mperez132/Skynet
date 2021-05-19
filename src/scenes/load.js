class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload() {
        //Loading assets
        this.load.image('ShipPlayer', './assets/janitorship.png');
        this.load.image('Background', './assets/tempbackground.png');
        this.load.image('shipTrail', './assets/trail.png');
        this.load.image('smolAsteroids', './assets/smallAsteroid.png');

        //loading sound
        this.load.audio('musicBackground','./assets/Backfill.mp3')
        this.load.audio('musicStart','./assets/Start_Tone.mp3')
    }


    create() {
        //Then move to menu scene
        this.scene.start('menuScene');
    }
}