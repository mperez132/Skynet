
"use strict";

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
    scene: [Load, Menu, Talking, Play],
}
let game = new Phaser.Game(config);
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
let keySPACE = null;
let intro = true;
let music
let startButton
let ending = false;
var player
var rt

let keyLEFT, keyRIGHT, keyR, keyUP, keyDOWN;

