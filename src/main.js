let config = {

    type: Phaser.AUTO,
    width: 1440,
    height: 720,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            },
            fps: 60
        }
    },
    scene: [Load, Menu, Play],
}
let music
let startButton
let game = new Phaser.Game(config);
var player

let keyLEFT, keyRIGHT, keyR, keyUP, keyDOWN;

