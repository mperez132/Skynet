class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    create(){
        this.backgroundSpace = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'Background').setOrigin(0,0);

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


        this.add.text(game.config.width / 2, game.config.height / 4, 'SKYNET', menuConfig).setOrigin(0,0);
        this.add.text(game.config.width / 2.4, game.config.height / 2, 'Press UP to play demo', menuConfig).setOrigin(0,0);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }
    
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start('playScene')
        }
    }
    
}