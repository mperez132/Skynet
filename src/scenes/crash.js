class Crash extends Phaser.Scene {
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

        this.OFFSCREEN_X = -1440;
        this.OFFSCREEN_Y = 1000;
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        //tileSprite temporary background
        this.backgroundSpace = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'Background').setOrigin(0,0);
        this.backgroundSpace2 = this.add.tileSprite(0,0, game.config.width, game.config.height - 20,
            'Background2').setOrigin(0,0);
        this.backgroundSpace2.setAlpha(0.5);
        player = this.physics.add.sprite(game.config.width /2, game.config.height /3 , 'ShipPlayer');
        player.angle = -90;
        //add explosion here

        
        this.dialog = this.cache.json.get('dialog');
        this.dialogbox = this.add.sprite(0,0, 'boxDialog').setOrigin(0);
        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);

        this.janitor = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+24, 'playerModel').setOrigin(0, 1);
        this.boss = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+24, 'bossModel').setOrigin(0, 1);
        keySPACE = this.input.keyboard.createCursorKeys();
        this.textStart();
    }

    update() {
        this.backgroundSpace.tilePositionY -= 1.5;
        this.backgroundSpace2.tilePositionY -= 0.6;
        if(Phaser.Input.Keyboard.JustDown(keySPACE.space) && !this.dialogTyping) {
            this.textStart();
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
                this.scene.start('playScene');
            })
        }
    }
}