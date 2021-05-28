class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {

        startButton.volume = 0.01;
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        //Canvas texture for trail.
        if(canvasBool){ 
            rt.destroy();
            //Canvas texture
            //var rt is a render texture for the trail the player can make on left click.
            rt = this.textures.createCanvas('canvastexture', game.config.width, game.config.height);
            //planBack.setAlpha(0.1);
            canvasBool = true;
        }
        else{
            //Canvas texture
            //var rt is a render texture for the trail the player can make on left click.
            rt = this.textures.createCanvas('canvastexture', game.config.width, game.config.height);
            //planBack.setAlpha(0.1);
            canvasBool = true;
        }
        planBack = this.textures.get('planet').getSourceImage();
        this.add.image(0, 0, 'bg').setOrigin(0);
        trailShip = this.textures.get('shipTrail').getSourceImage();
        this.playerDraw = true;
        if(this.playerDraw) {
            rt.draw(0, 0, planBack);
        }
    rt.context.globalCompositeOperation = 'destination-out';
        this.canvasTEXT = this.add.image(0,0, 'canvastexture').setOrigin(0);
        // //Canvas texture
        // planBack = this.textures.get('planet').getSourceImage();
        // this.add.image(0, 0, 'bg').setOrigin(0);
        // //var rt is a render texture for the trail the player can make on left click.
        // rt = this.textures.createCanvas('canvastexture', game.config.width, game.config.height);
        // trailShip = this.textures.get('shipTrail').getSourceImage();
        // //planBack.setAlpha(0.1);
        // this.playerDraw = true;
        // if(this.playerDraw) {
        //     rt.draw(0, 0, planBack);
        // }
        // //rt.draw(0, 0, planBack);
        // rt.context.globalCompositeOperation = 'destination-out';
        // this.canvasTEXT = this.add.image(0,0, 'canvastexture').setOrigin(0);


        //Backgrounds
        this.backgroundSpace = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'Background').setOrigin(0,0);
        this.backgroundSpace2 = this.add.tileSprite(0,0, game.config.width, game.config.height - 20,
            'Background2').setOrigin(0,0);
        this.backgroundSpace2.setAlpha(0.5);

        //Particles
        pt = this.add.renderTexture(0,0, game.config.width, game.config.height,).setInteractive().setDepth(1000);
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
        this.trailGroup = this.physics.add.group();
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

        //Player UI
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

        //Keyboard controller
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //Booleans
        this.gameStatus = false;
        this.playerAlive = true;
    }

    //Allowing the player to follow the mouse cursor 
    update(time, delta) {
        particles.setPosition(this.comet01.x, this.comet01.y);
        pt.clear();
        this.backgroundSpace.tilePositionY -= 1.5;
        this.backgroundSpace2.tilePositionY -= 0.6;

        if(this.gameStatus) {
            //time survived?
            //this.score += delta;
        }
        //Start game
        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
            startButton.play();
            //player.setAlpha(0);
            //player.destroy();
            this.playerAlive = false;
            this.gameStatus = true;
            this.playerDraw = false;

            music.stop();
            intro = false;
            //rt.destroy();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                //rt.destroy();
                this.scene.start('menuScene');
            })
        }
        this.debris01.update();
        if(temp1 == true) {
            particles.setPosition(this.comet01.x, this.comet01.y);
            this.comet01.update();
        }
        this.debris01.angle += 0.3
        this.checkDebris();

        if(this.physics.collide(this.playerGroup, this.debrisGroup)) {
            this.debris01.destroy();
            player.setAlpha(0);
            //player.destroy();
            this.playerAlive = false;
            this.gameStatus = true;
            this.playerDraw = false;

            music.stop();
            intro = false;
            //rt.destroy();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                //rt.destroy();
                this.scene.start('menuScene');
            })
        }
        if(this.physics.collide(this.playerGroup, this.cometGroup)) {
            this.comet01.destroy();
            player.setAlpha(0);
            //player.destroy();
            particles.destroy();
            this.playerAlive = false;
            this.gameStatus = true;
            this.playerDraw = false;
            music.stop();
            intro = false;
            //rt.destroy();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                //rt.destroy();
                this.scene.start('menuScene');
            })
        }
        //If player is alive
        if(this.playerAlive) {
            player.body.allowRotation = false;
            player.setCollideWorldBounds(true);
            player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0,0,1440, 890));
            var pointer = this.input.activePointer;
            player.rotation = this.physics.moveTo(player, game.input.activePointer.x, 
                game.input.activePointer.y, 60, 1500);
        
            if (this.playerDraw){
                if (pointer.isDown) {
                    rt.draw(player.x, player.y, trailShip);
                }
            }
        }
        //rt.refresh();
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