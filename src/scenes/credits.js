class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene");
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.backgroundSpace = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'Background').setOrigin(0,0);
        this.backgroundSpace2 = this.add.tileSprite(0,0, game.config.width, game.config.height - 20,
            'Background2').setOrigin(0,0);
            this.backgroundSpace2.setAlpha(0.5);

        startButton = this.sound.add('musicStart');
        startButton.volume = 0.01;

        this.nextText = this.add.bitmapText(1150, 875, 'gem_font', '[PRESS UP]', 50)
        this.add.bitmapText(centerX, centerY -200, 'gem_font', 'DEVELOPERS', 75).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY - 25, 'gem_font', 'Moises Perez: Programmer', 50).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + 50, 'gem_font', 'Constantine Kolokousis: Audio and Music Design', 50).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + 125, 'gem_font', 'Brian Cao: Artist and Programmer', 50).setOrigin(0.5);
        
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    update() {
        this.backgroundSpace.tilePositionY -= 1.5;
        this.backgroundSpace2.tilePositionY -= 0.6;
        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
            startButton.play();
            music.stop();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                this.scene.start('menuScene');
            })
        }
    }

}