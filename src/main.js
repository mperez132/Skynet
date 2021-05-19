let config = {

    type: Phaser.CANVAS,
    width: 1440,
    height: 960,
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
        }
    },
    scene: [Load, Menu, Play],
}
let music
let startButton
let game = new Phaser.Game(config);
var player
var rt

let keyLEFT, keyRIGHT, keyR, keyUP, keyDOWN;

