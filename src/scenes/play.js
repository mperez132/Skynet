class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        //var rt is a render texture for the trail the player can make on left click.
        var rt = this.add.renderTexture(0,0, game.config.width, game.config.height,).setInteractive().setDepth(1000);
        //tileSprite temporary background
        this.backgroundSpace = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'Background').setOrigin(0,0);
        //Creation of the player ship with physics
        player = this.physics.add.sprite(game.config.width /2, game.config.height /2 , 'playerShip1');
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
        //Adding text to the playConfig
        this.add.text(game.config.width / 4, game.config.height / 5, 'Move cursor and press LMB to create a trail', playConfig).setOrigin(0,0);
        //Adding text to the playConfig
        this.add.text(game.config.width / 2.5, game.config.height / 3, 'Press UP to reset', playConfig).setOrigin(0,0);
        //Checking whether the pointer is down
        rt.on('pointerdown', function (pointer) {

            this.draw('shipTrail', player.x, player.y, 1);
            console.log('drawing');
        });
        rt.on('pointermove', function (pointer) {

            if (pointer.isDown)
            {
                this.draw('shipTrail', player.x, player.y , 1);
                console.log('drawing2');
            }
    
        });
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }
    //Allowing the player to follow the mouse cursor 
    update() {
        player.body.allowRotation = false;
        player.rotation = this.physics.moveTo(player, game.input.activePointer.x, 
            game.input.activePointer.y, 60, 500);

        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start('menuScene')
        }

    }


}