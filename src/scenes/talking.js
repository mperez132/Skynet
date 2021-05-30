class Talking extends Phaser.Scene {
    constructor() {
        super("talkingScene");
        this.DBOX_X = 0;
        this.DBOX_Y = 630;
        this.DBOX_FONT = 'gem_font';

        this.TEXT_X = 50;
        this.TEXT_Y = 675;
        this.TEXT_SIZE = 50;
        this.TEXT_MAX_WIDTH = 1355;

        this.NEXT_TEXT = '[SPACE]';
        this.NEXT_X = 1400;
        this.NEXT_Y = 750;

        this.LETTER_TIMER = 40;

        this.dialogConvo = 0;			
        this.dialogLine = 0;			
        this.dialogSpeaker = null;		
        this.dialogLastSpeaker = null;	
        this.dialogTyping = false;		
        this.dialogText = null;			
        this.nextText = null;			

        this.janitor = null;
        this.boss = null;
        this.tweenDuration = 300;
        this.newSpeakerCounter = 0;

        this.OFFSCREEN_X = -1440;
        this.OFFSCREEN_Y = 1000;
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)

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
        this.comet01 = new Debris(this, game.config.width / 2, -100, 'cometDebris');
        this.comet01.movementSpeed = 0.5;
        this.cometGroup = this.physics.add.group();
        this.cometGroup.add(this.comet01);
        particles.setPosition(this.comet01.x, this.comet01.y);

        
        //tileSprite temporary background
        this.backgroundSpace = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'Background').setOrigin(0,0);
        this.backgroundSpace2 = this.add.tileSprite(0,0, game.config.width, game.config.height - 20,
            'Background2').setOrigin(0,0);
        this.backgroundSpace2.setAlpha(0.5);


        player = this.physics.add.sprite(game.config.width /2, game.config.height /3 , 'ShipPlayer');
        this.playerGroup = this.physics.add.group();
        this.playerGroup.add(player);
        player.angle = -90;
        this.dialog = this.cache.json.get('dialog');
        this.dialogbox = this.add.sprite(0,0, 'boxDialog').setOrigin(0);
        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);

        this.janitor = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+24, 'playerModel').setOrigin(0, 1);
        this.boss = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+24, 'bossModel').setOrigin(0, 1);
        keySPACE = this.input.keyboard.createCursorKeys();
        this.playerAlive = true;
        this.textStart();
    }

    update() {
        this.backgroundSpace.tilePositionY -= 1.5;
        this.backgroundSpace2.tilePositionY -= 0.6;
        tempColor = rt.getPixel(this.comet01.x, this.comet01.y);
        if(Phaser.Input.Keyboard.JustDown(keySPACE.space) && !this.dialogTyping) {
            this.textStart();
        }
        if(this.newSpeakerCounter >= 5) {
            //If player is alive
            if(this.playerAlive) {
                player.body.allowRotation = false;
                player.setCollideWorldBounds(true);
                player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0,0,1440, 890));
                var pointer = this.input.activePointer;
                player.rotation = this.physics.moveTo(player, game.input.activePointer.x, 
                game.input.activePointer.y, 600, 1000);
        
            if (this.playerDraw){
                if (pointer.isDown) {
                    rt.draw(player.x, player.y, trailShip);
                }
            }
        }
            var timedEvent = this.time.delayedCall(7000, this.onEvent, [], this);
        }
    }

    onEvent(){
        this.comet01.update();
        particles.setPosition(this.comet01.x, this.comet01.y);
        if(tempColor.r == 29 && tempColor.g == 207 && tempColor.b == 231) {
            var temp = this.comet01.getTopLeft();
            rt.clear(temp.x, temp.y, this.comet01.width, this.comet01.height);
            particles.destroy();
            this.comet01.destroy();
        }
    }

    textStart() {
        this.dialogTyping = true;

        this.dialogText.text = '';
        this.nextText.text = '';
        if(this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
            this.dialogLine = 0;
            this.dialogConvo++;
        }

        if(this.dialogConvo >= this.dialog.length) {
            console.log('End of Converstaions');
            if(this.dialogLastSpeaker) {
                this.tweens.add({
                    targets: this[this.dialogLastSpeaker],
                    x: this.OFFSCREEN_X,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }
            this.dialogbox.visible = false;
            //console.log(ending);
            ending = true;
            //console.log(ending);
        } else {
            this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];
            if(this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']){
                this.newSpeakerCounter +=1;
                if(this.dialogLastSpeaker) {
                    this.tweens.add({
                        targets: this[this.dialogLastSpeaker],
                        x: this.OFFSCREEN_X,
                        duration: this.tweenDuration,
                        ease: 'Linear'
                    });
                }

                this.tweens.add({
                targets: this[this.dialogSpeaker],
                x: this.DBOX_X + 40,
                duration: this.tweenDuration,
                ease: 'Linear'
                });
            }
            this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];

            let currentChar = 0; 
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.dialogLines.length - 1,
                callback: () => { 
                    this.dialogText.text += this.dialogLines[currentChar];
                    currentChar++;
                    if(this.textTimer.getRepeatCount() == 0) {
                     this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y + 190, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1);
                        this.dialogTyping = false;
                        this.textTimer.destroy();
                    }
                },
            callbackScope: this 
        });

        this.dialogText.maxWidth = this.TEXT_MAX_WIDTH;

        this.dialogLine++;
        this.dialogLastSpeaker = this.dialogSpeaker;
        }
        if(ending) {
            startButton.play();
            intro = false;
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                pt.destroy();
                particles.destroy();
                rt.clear();
                //rt.destroy();
                this.scene.start('playScene');
            })
        }
    }
}