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
        //tileSprite backgrounds
        this.backgroundSpace = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'Background').setOrigin(0,0);
        this.backgroundSpace2 = this.add.tileSprite(0,0, game.config.width, game.config.height - 20,
            'Background2').setOrigin(0,0);
        this.backgroundSpace2.setAlpha(0.5);

        this.planBack = this.add.tileSprite(0,0, game.config.width, game.config.height - 20,
            'planet').setOrigin(0,0);
        this.planBack.setAlpha(0.1);

        particles = this.add.particles('flare');

        particles.createEmitter({
            frame: 'blue',
            x: 0,
            y: 0,
            speed: { min: 400, max: 200 },
            angle: { min: -85, max: -95 },
            gravityY: 300,
            scale: { start: 0.3, end: 0, ease: 'Back.easeOut' },
            quantity: 1,
            blendMode: 'ADD',
        });

        particles.setVisible(true);

        //Create collision groups
        this.playerGroup = this.physics.add.group();
        this.debrisGroup = this.physics.add.group();
        this.cometGroup = this.physics.add.group();
         //Creation of the player ship with physics and the first asteroid. 
        player = this.physics.add.sprite(game.config.width /2, game.config.height /2 , 'ShipPlayer');
        this.playerGroup.add(player);

        this.debris01 = new Debris(this, Phaser.Math.Between(0, this.game.config.width), -100, 'smolAsteroid');
        this.debrisGroup.add(this.debris01);

        //this.clock = this.time.delayedCall(3000, () => {
        this.comet01 = new Debris(this, Phaser.Math.Between(0, this.game.config.width), -100, 'cometDebris');
        this.comet01.movementSpeed = 4;
        this.cometGroup.add(this.comet01);
        temp1 = true;
        //}, null, this); 

        this.pUI = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'playerUI').setOrigin(0,0);
        this.pUI.depth = 100;

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

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.gameStatus = false;
    }
    //Allowing the player to follow the mouse cursor 
    update(time, delta) {
        if(!this.gameStatus) {

            //time survived?
            this.score += delta;

        }
        particles.setPosition(this.comet01.x, this.comet01.y);
        pt.clear();
        this.backgroundSpace.tilePositionY -= 1.5;
        this.backgroundSpace2.tilePositionY -= 0.6;
        this.planBack.tilePositionY -= 0.1;
        player.body.allowRotation = false;
        player.setCollideWorldBounds(true);
        player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0,0,1440, 890));
        var pointer = this.input.activePointer;
        player.rotation = this.physics.moveTo(player, game.input.activePointer.x, 
            game.input.activePointer.y, 60, 1500);

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
        this.debris01.update();
        if(temp1 == true) {
            particles.setPosition(this.comet01.x, this.comet01.y);
            this.comet01.update();
        }
        this.debris01.angle += 0.3
        this.checkDebris();
    }

    checkDebris() {
        if(this.debris01.y >= game.config.height + 50) {
            this.texturePicker = Math.floor(Math.random() * (3-1) + 1);
            console.log(this.texturePicker);
            this.debris01.destroy();
            if(this.texturePicker == 1) {
                this.debris01 = new Debris(this, Phaser.Math.Between(50, this.game.config.width-50), -100, 'bicAsteroid');
                this.debrisGroup.add(this.debris01);
            }
            else if(this.texturePicker == 2) {
                this.debris01 = new Debris(this, Phaser.Math.Between(50, this.game.config.width-50), -100, 'smolAsteroid');
                this.debris01.movementSpeed = 2.5
                this.debrisGroup.add(this.debris01);
            }
        }
        if(temp1 == true) {
            if(this.comet01.y >= game.config.height + 50) {
                this.texturePicker = Math.floor(Math.random() * (1-1) + 1);
                console.log(this.texturePicker);
                this.comet01.destroy();
                if(this.texturePicker == 1) {
                    this.comet01 = new Debris(this, Phaser.Math.Between(0, this.game.config.width), -100, 'cometDebris');
                    this.comet01.movementSpeed = 3;
                    this.cometGroup.add(this.comet01);
                    //pt.draw(particles, this.comet01.x , this.comet01.y, 1);
                }
                // else if( this.texturePicker == 2) {
                //     this.comet01 = new Debris(this, Phaser.Math.Between(0, this.game.config.width), -100, 'alien');
                //     this.comet01.movementSpeed = 2;
                //     this.cometGroup.add(this.comet01);
                // }
            }
        }
    }
}