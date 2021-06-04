class Gameover extends Phaser.Scene {
    constructor(){
        super("gameOverScene");
    }

    create() {
        music.stop();
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        //Backgrounds
        this.add.image(0,0,'paycheck').setOrigin(0,0);
        phaser2 = this.add.dynamicBitmapText(430,420, 'gem_font', PlayerMoney + '.00', 125);
        this.nextText = this.add.bitmapText(1400, 190, 'gem_font', '[PRESS UP]', 50).setOrigin(1);
        //Keyboard controller
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    update() {
        //Start game
        if(Phaser.Input.Keyboard.JustDown(keyUP)) {
            startButton.play();
            PlayerMoney = 0;
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,(cam, effect)=> {
                this.scene.start('menuScene');
            })
        }
    }
}