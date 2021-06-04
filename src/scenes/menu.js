class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        
        this.backgroundSpace = this.add.tileSprite(0,0, game.config.width, game.config.height,
            'Background').setOrigin(0,0);
        this.backgroundSpace2 = this.add.tileSprite(0,0, game.config.width, game.config.height - 20,
            'Background2').setOrigin(0,0);
            this.backgroundSpace2.setAlpha(0.5);
            

        music = this.sound.add('musicBackground');
        music.stop();
        startButton = this.sound.add('musicStart');
        startButton.volume = 0.01;
        music.volume = 0.05;
        music.loop = true;
        music.play();
        this.add.bitmapText(centerX, centerY - 32, 'gem_font', 'SKY NET', 75).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + 50, 'gem_font', 'Press UP to Start Game', 50).setOrigin(0.5);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }
    
    update() {
        this.backgroundSpace.tilePositionY -= 1.5;
        this.backgroundSpace2.tilePositionY -= 0.6;
        //On pressing up, the scene changes to playScene
        if(!intro) {
            if(Phaser.Input.Keyboard.JustDown(keyUP)) {
                startButton.play();
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                    this.scene.start('talkingScene');
                })
            }
            if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                startButton.play();
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                    this.scene.start('playScene');
                })
            }
        }
        else if(intro){
            if(Phaser.Input.Keyboard.JustDown(keyUP)) {
                startButton.play();
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                    this.scene.start('talkingScene');
                })
            }
            if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                startButton.play();
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                    this.scene.start('playScene');
                })
            }
         }
    }
    
}