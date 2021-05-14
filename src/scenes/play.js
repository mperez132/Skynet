class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        var rt = this.add.renderTexture(0,0, game.config.width, game.config.height,).setInteractive().setDepth(1000);
        this.backgroundSpace = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'Background').setOrigin(0,0);

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
        this.add.text(game.config.width / 2.5, game.config.height / 5, 'Move cursor around', playConfig).setOrigin(0,0);

        player = this.physics.add.sprite(game.config.width /2, game.config.height /2 , 'playerShip1');
        rt.on('pointerdown', function (pointer) {

            this.draw('trail', player.x, player.y, 1);
            console.log('drawing');
        });
        rt.on('pointermove', function (pointer) {

            if (pointer.isDown)
            {
                this.draw('trail', player.x, player.y , 1);
                console.log('drawing2');
            }
    
        });
    }

    update() {
        player.body.allowRotation = false;
        player.rotation = this.physics.moveTo(player, game.input.activePointer.x, 
            game.input.activePointer.y, 60, 500);

    }


}