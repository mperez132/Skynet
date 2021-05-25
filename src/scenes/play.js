class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {

        startButton.volume = 0.01;
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        //var rt is a render texture for the trail the player can make on left click.
        rt = this.add.renderTexture(0,0, game.config.width, game.config.height,).setInteractive().setDepth(1000);
        pt = this.add.renderTexture(0,0, game.config.width, game.config.height,).setInteractive().setDepth(1000);
        //tileSprite temporary background
        this.backgroundSpace = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'Background').setOrigin(0,0);
        this.backgroundSpace2 = this.add.tileSprite(0,0, game.config.width, game.config.height - 20,
            'Background2').setOrigin(0,0);
            this.backgroundSpace2.setAlpha(0.5);
        this.pUI = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'playerUI').setOrigin(0,0);
        //Creation of the player ship with physics
        player = this.physics.add.sprite(game.config.width /2, game.config.height /2 , 'ShipPlayer');
        // menu text configuration
        let playConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        particles = this.add.particles('flare');

        particles.createEmitter({
            frame: 'blue',
            speed: { min: 1, max: 1 },
            angle: 0,
            gravityY: 100,
            gravityX: 100,
            scale: { start: 0.1, end: 0 },
            quantity: 2,
            blendMode: 'ADD'
        });

        particles.setVisible(false);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }
    //Allowing the player to follow the mouse cursor 
    update() {
        pt.clear();
        this.backgroundSpace.tilePositionY -= 1.5;
        this.backgroundSpace2.tilePositionY -= 0.6;
        player.body.allowRotation = false;
        player.setCollideWorldBounds(true);
        player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0,0,1440, 890));
        var pointer = this.input.activePointer;
        player.rotation = this.physics.moveTo(player, game.input.activePointer.x, 
            game.input.activePointer.y, 60, 500);

        //pt.draw(particles, player.x , player.y, 1);

        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
            startButton.play();
            music.stop();
            intro = false;
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                this.scene.start('menuScene');
            })
        }
        if(pointer.isDown){
            console.log('down2');
            rt.draw('shipTrail', player.x, player.y , 1);
            //pt.draw(particles, player.x, player.y, 1);
        }

    }
}