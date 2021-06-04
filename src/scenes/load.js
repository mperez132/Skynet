class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    preload() {
        //Loading assets
        this.load.image('ShipPlayer', './assets/janitorship.png');
        this.load.image('Background', './assets/tempbackground.png');
        this.load.image('Background2', './assets/tempbackground2.png');
        this.load.image('planet', './assets/planetBackground.png');
        this.load.image('shipTrail', './assets/trail.png');
        this.load.image('smolAsteroid', './assets/smallAsteroid.png');
        this.load.image('bicAsteroid', './assets/bigAsteroid.png');
        this.load.image('alien', './assets/ufo.png');
        this.load.image('cometDebris', './assets/comet.png');
        this.load.image('playerUI', './assets/playerHud.png');
        this.load.image('bg', './assets/pixil-frame-0.png');

        //Loading Dialog assets
        this.load.json('dialog', './assets/json/dialog.json');
        this.load.json('dialogCrash', './assets/json/crashDialog.json');
        this.load.json('dialogDebris', './assets/json/debrisDialog.json');
        this.load.json('dialogFired', './assets/json/firedDialog.json');
        this.load.image('boxDialog', './assets/img/dialogbox.png');
        this.load.image ('playerModel', './assets/img/PlayerFace.png');
        this.load.image ('bossModel', './assets/img/BossFace.png');
        this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml');

        //Loading particle assets
        this.load.atlas('flare', 'assets/flares.png', 'assets/json/flares.json');

        //loading sound
        this.load.audio('musicBackground','./assets/Backfill.mp3');
        this.load.audio('ship_sfx', './assets/Ship_Hum.mp3');
        this.load.audio('musicStart','./assets/Start_Tone.mp3');
        this.load.audio('debris_sfx', './assets/Asteroid_Destroyed_1.mp3');
        this.load.audio('gameOverSound', './assets/Game_Over_Lng_Mix.mp3');
        this.load.audio('sheesh', './assets/Sheesh_Crop.mp3');
        this.load.audio('trailFade', './assets/Trail_Fade.mp3');
        this.load.audio('playerExplosion', './assets/Enemy_Explosion5.mp3');
    }

    create() {
        //Then move to menu scene
        this.scene.start('menuScene');
    }
}