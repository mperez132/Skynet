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

        
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

}