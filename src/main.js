
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
            fps:60,
        }
    },
    scene: [Load, Menu, Talking, Play, Crash, Gameover],
}
let game = new Phaser.Game(config);
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
let keySPACE = null;
let intro = true;

let music;
let startButton;
let debrisSound;

var colorDebris02;

let ending = false;
var player;
var rt;
var pt;
var trailShip;
let canvasBool = false;
var tempColor;
var color;

let PlayerMoney = 0;
var phaser2;
let TrailTime = 0;
let debrisCount = 3;

let earthBool = false;
let firedBool = false;
let temp1 = false;
let temp2 = false;
var particles;


let keyLEFT, keyRIGHT, keyR, keyUP, keyDOWN;

