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

        //Loading Dialog assets
        this.load.json('dialog', './assets/json/dialog.json');
        this.load.image('boxDialog', './assets/img/dialogbox.png');
        this.load.image ('homer1', './assets/img/homer.png');
        this.load.image ('jove1', './assets/img/jove.png');
        this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml');

        //loading sound
        this.load.audio('musicBackground','./assets/Backfill.mp3')
        this.load.audio('musicStart','./assets/Start_Tone.mp3')
    }


    create() {
        //Then move to menu scene
        this.scene.start('menuScene');
    }
}