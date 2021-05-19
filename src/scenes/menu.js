class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.backgroundSpace = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'Background').setOrigin(0,0);

        music = this.sound.add('musicBackground');
        startButton = this.sound.add('musicStart');
        startButton.volume = 0.01;
        music.volume = 0.05;
        music.loop = true;
        music.play();

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
        }

        //Add text to the menu Config
        this.add.text(game.config.width / 2.1, game.config.height / 4, 'SKYNET', menuConfig).setOrigin(0,0);
        this.add.text(game.config.width / 2.6, game.config.height / 2, 'Press UP to play demo', menuConfig).setOrigin(0,0);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        
    }
    
    update() {
        this.backgroundSpace.tilePositionY -= 1.5;
        //On pressing up, the scene changes to playScene
        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
            startButton.play();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                this.scene.start('playScene');
            })
        }
    }
    
}