class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //this.load.image('shipTrail', './assets/trail.png');
        this.load.spritesheet('animateShip', './assets/animatedJanitorShip.png',{
            frameWidth: 64,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 3
        });
    }

    create() {

        PlayerMoney = 0;
        startButton.volume = 0.01;
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        debrisSound = this.sound.add('debris_sfx');
        debrisSound.volume = 0.05;

        idleSound = this.sound.add('ship_sfx');
        idleSound.volume = 0.02;
        idleSound.loop = true;
        idleSound.play();

        sheeshSound = this.sound.add('sheesh');
        sheeshSound.volume = 0.02;

        trailSound = this.sound.add('trailFade');
        trailSound.volume = 0.02;

        //Canvas texture for trail.
        if(canvasBool){ 
            rt.destroy();
            //Canvas texture
            rt = this.textures.createCanvas('canvastexture', game.config.width, game.config.height);
            canvasBool = true;
        }
        else{
            //Canvas texture
            rt = this.textures.createCanvas('canvastexture', game.config.width, game.config.height);
            canvasBool = true;
        }

        trailShip = this.textures.get('shipTrail').getSourceImage();
        this.playerDraw = true;
        this.canvasTEXT = this.add.image(0,0, 'canvastexture').setOrigin(0);

        //Backgrounds
        this.add.image(0,0,'planet').setOrigin(0,0).setAlpha(0.1);
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
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('animateShip',{
                start: 0,
                end: 3,
                first: 0
            }),
            frameRate: 20,
            repeat: -1
        });
        player.anims.play('idle');
        this.debris01 = new Debris(this, Phaser.Math.Between(200, this.game.config.width-200), -100, 'smolAsteroid').setOrigin(0.5,0.5);
        this.debrisGroup.add(this.debris01);

        this.clock = this.time.delayedCall(10000, () => {
            this.debris02 = new Debris(this, Phaser.Math.Between(200, this.game.config.width-200), -100, 'smolAsteroid').setOrigin(0.5,0.5);
            this.debrisGroup.add(this.debris02);
            temp2 = true;
        }, null, this);
        //this.clock = this.time.delayedCall(3000, () => {
        this.comet01 = new Debris(this, Phaser.Math.Between(200, this.game.config.width-200), -100, 'cometDebris');
        this.comet01.movementSpeed = 2;
        this.cometGroup.add(this.comet01);
        sheeshSound.play();
        particles.setPosition(this.comet01.x, this.comet01.y);
        temp1 = true;
        //}, null, this); 

        //Player UI
        this.pUI = this.add.image(0,0,'playerUI').setOrigin(0,0);
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
        phaser2 = this.add.dynamicBitmapText(0, 0, 'gem_font', 'COMPENSATION: $ ' + PlayerMoney + '.00', 35);

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

        //console.log(color);
        if(this.gameStatus) {
            //time survived?
            //this.score += delta;
        }
        //Start game
        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
            startButton.play();
            this.playerAlive = false;
            this.gameStatus = true;
            this.playerDraw = false;
            music.stop();
            idleSound.stop();
            intro = false;
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                this.scene.start('menuScene');
            })
        }
        this.debris01.update();
        if(temp2) {
            colorDebris02 = rt.getPixel(this.debris02.x, this.debris02.y);
            this.debris02.update();
            if(colorDebris02.r == 29 && colorDebris02.g == 207 && colorDebris02.b == 231) {
                colorDebris02.r == 0;
                colorDebris02.g == 0;
                colorDebris02.b == 0;
                TrailTime += 1;
                PlayerMoney += 10;
                debrisSound.play();
                var temp = this.debris02.getTopLeft();
                //console.log(temp);
                rt.clear(temp.x, temp.y , this.debris02.width, this.debris02.height);
                //money sound
    
                phaser2.setText('COMPENSATION: $ ' + PlayerMoney + '.00');
                if(TrailTime >= 2) {
                    //sound for trail destroying
                    trailSound.play();
                    rt.clear();
                    TrailTime = 0;
                }
                this.debris02.destroy();
                this.texturePicker = Math.floor(Math.random() * (3-1) + 1);
                if(this.texturePicker == 1) {
                    this.debris02 = new Debris(this, Phaser.Math.Between(200, this.game.config.width-200), -100, 'bicAsteroid').setOrigin(0.5,0.5);
                    this.debris02.movementSpeed = 1.5;
                    this.debrisGroup.add(this.debris02);
                }
                else if(this.texturePicker == 2) {
                    this.debris02 = new Debris(this, Phaser.Math.Between(200, this.game.config.width-200), -100, 'smolAsteroid').setOrigin(0.5,0.5);
                    this.debris02.movementSpeed = 1;
                    this.debrisGroup.add(this.debris02);
                }
            }

        }
        if(temp1 == true) {
            particles.setPosition(this.comet01.x, this.comet01.y);
            this.comet01.update();
        }
        //this.debris01.angle += 0.3
        this.checkDebris();

        if(this.physics.collide(this.playerGroup, this.debrisGroup)) {
            music.stop();
            idleSound.stop();
            this.debris01.destroy();
            player.destroy();
            this.playerAlive = false;
            this.gameStatus = true;
            this.playerDraw = false;

            music.stop();
            intro = false;
            //this.cameras.main.shake(200, 0.01);
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                this.scene.start('crashScene');
            })
        }
        if(this.physics.collide(this.playerGroup, this.cometGroup)) {
            music.stop();
            idleSound.stop();
            this.comet01.destroy();
            player.destroy()
            particles.destroy();
            this.playerAlive = false;
            this.gameStatus = true;
            this.playerDraw = false;
            music.stop();
            intro = false;
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                this.scene.start('crashScene');
            })
        }
        //If player is alive
        if(this.playerAlive) {
            player.body.allowRotation = false;
            player.setCollideWorldBounds(true);
            player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0,0,1440, 890));
            var pointer = this.input.activePointer;
            player.rotation = this.physics.moveTo(player, game.input.activePointer.x, 
                game.input.activePointer.y, 600, 1000);
            //player.anims.play('idle');
        
            if (this.playerDraw){
                if (pointer.isDown) {
                    rt.draw(player.x, player.y, trailShip);
                }
            }
        }
        color = rt.getPixel(this.debris01.x, this.debris01.y);
        tempColor = rt.getPixel(this.comet01.x, this.comet01.y);
        if(color.r == 29 && color.g == 207 && color.b == 231) {
            color.r == 0;
            color.g == 0;
            color.b == 0;
            TrailTime += 1;
            PlayerMoney += 10;
            debrisSound.play();
            var temp = this.debris01.getTopLeft();
            //console.log(temp);
            rt.clear(temp.x, temp.y , this.debris01.width, this.debris01.height);
            //money sound


            phaser2.setText('COMPENSATION: $ ' + PlayerMoney + '.00');
            if(TrailTime >= 2) {
                //sound for trail destroying
                rt.clear();
                trailSound.play();
                TrailTime = 0;
            }
            this.debris01.destroy();
            this.texturePicker = Math.floor(Math.random() * (3-1) + 1);
            if(this.texturePicker == 1) {
                this.debris01 = new Debris(this, Phaser.Math.Between(200, this.game.config.width-200), -100, 'bicAsteroid').setOrigin(0.5,0.5);
                this.debris01.movementSpeed = 1.5;
                this.debrisGroup.add(this.debris01);
            }
            else if(this.texturePicker == 2) {
                this.debris01 = new Debris(this, Phaser.Math.Between(200, this.game.config.width-200), -100, 'smolAsteroid').setOrigin(0.5,0.5);
                this.debris01.movementSpeed = 1;
                this.debrisGroup.add(this.debris01);
            }
        }
        if(tempColor.r == 29 && tempColor.g == 207 && tempColor.b == 231) {
            tempColor.r = 0 
            tempColor.g = 0;
            tempColor.b = 0;
            TrailTime += 1;
            PlayerMoney += 15;
            debrisSound.play();
            var temp = this.comet01.getTopLeft();
            this.texturePicker = Math.floor(Math.random() * (3-1) + 1);
            rt.clear(temp.x, temp.y, this.comet01.width, this.comet01.height);
            //money sound


            phaser2.setText('COMPENSATION: $ ' + PlayerMoney + '.00');
            if(TrailTime >= 2) {
                //sound for trail destroying
                rt.clear();
                trailSound.play();
                TrailTime = 0;
            }
            particles.destroy();
            this.comet01.destroy();
            particles.destroy();
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
                particles.setPosition(this.comet01.x, this.comet01.y);
                this.comet01 = new Debris(this, Phaser.Math.Between(200, this.game.config.width-200), -100, 'cometDebris');
                this.comet01.movementSpeed = 2;
                this.cometGroup.add(this.comet01);
                //sheeshSound.play();
                if(this.texturePicker == 1) {
                    sheeshSound.play();
                }
                else if(this.texturePicker == 2) {
                }
        }
        //rt.refresh();
    }

    checkDebris() {
        if(temp2) {
            if(this.debris02.y >= game.config.height) {
                debrisCount -= 1;
                this.texturePicker = Math.floor(Math.random() * (3-1) + 1);
                console.log('Debris coutner = ' + debrisCount);
                //console.log(this.texturePicker);
                this.debris02.destroy();
                this.cameras.main.shake(200, 0.01);
                if(debrisCount <= 0) {
                    earthBool = true;
                    music.stop();
                    debrisCount = 3;
                    intro = false;
                    //this.cameras.main.shake(200, 0.01);
                    this.cameras.main.fadeOut(1000, 0, 0, 0);
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                        this.scene.start('crashScene');
                    })
                }
                if(this.texturePicker == 1) {
                    this.debris02 = new Debris(this, Phaser.Math.Between(200, this.game.config.width-200), -100, 'bicAsteroid').setOrigin(0.5,0.5);
                    this.debris02.movementSpeed = 1.5;
                    this.debrisGroup.add(this.debris02);
                }
                else if(this.texturePicker == 2) {
                    this.debris02 = new Debris(this, Phaser.Math.Between(200, this.game.config.width-200), -100, 'smolAsteroid').setOrigin(0.5,0.5);
                    this.debris02.movementSpeed = 1;
                    this.debrisGroup.add(this.debris02);
                }
            }
        }
        if(this.debris01.y >= game.config.height) {
            debrisCount -= 1;
            this.texturePicker = Math.floor(Math.random() * (3-1) + 1);
            console.log('Debris coutner = ' + debrisCount);
            //console.log(this.texturePicker);
            this.debris01.destroy();
            this.cameras.main.shake(200, 0.01);
            if(debrisCount <= 0) {
                earthBool = true;
                debrisCount = 3;
                music.stop();
                intro = false;
                //this.cameras.main.shake(200, 0.01);
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                    this.scene.start('crashScene');
                })
            }
            if(this.texturePicker == 1) {
                this.debris01 = new Debris(this, Phaser.Math.Between(20, this.game.config.width-200), -100, 'bicAsteroid').setOrigin(0.5,0.5);
                this.debris01.movementSpeed = 1.5;
                this.debrisGroup.add(this.debris01);
            }
            else if(this.texturePicker == 2) {
                this.debris01 = new Debris(this, Phaser.Math.Between(200, this.game.config.width-200), -100, 'smolAsteroid').setOrigin(0.5,0.5);
                this.debris01.movementSpeed = 1;
                this.debrisGroup.add(this.debris01);
            }
        }
        if(temp1 == true) {
            if(this.comet01.y >= game.config.height + 50) {
                //console.log(this.texturePicker);
                debrisCount -= 1;
                this.texturePicker = Math.floor(Math.random() * (3-1) + 1);
                this.comet01.destroy();
                particles.destroy();
                this.cameras.main.shake(200, 0.01);
                if(debrisCount <= 0) {
                    earthBool = true;
                    debrisCount = 3;
                    music.stop();
                    idleSound.stop();
                    intro = false;
                    //this.cameras.main.shake(200, 0.01);
                    this.cameras.main.fadeOut(1000, 0, 0, 0);
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                        this.scene.start('crashScene');
                    })
                }
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
                particles.setPosition(this.comet01.x, this.comet01.y);
                this.comet01 = new Debris(this, Phaser.Math.Between(200, this.game.config.width-200), -100, 'cometDebris');
                this.comet01.movementSpeed = 2;
                this.cometGroup.add(this.comet01);
                if(this.texturePicker == 1) {
                    sheeshSound.play();
                }
                else if(this.texturePicker == 2) {
                }
            }
        }
    }
}