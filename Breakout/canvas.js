var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = 480;
canvas.height = 600;

var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-80;
var dx = Math.floor(1+Math.random()*5);
var dy = -Math.floor(1+Math.random()*5);
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var color = "#FF0000";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function randomHex() {
    return "0123456789ABCDEF"[Math.floor(Math.random()*16)];
}
function randomColor() {
    return "#"+randomHex()+randomHex()+randomHex()+randomHex()+randomHex()+randomHex();
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
