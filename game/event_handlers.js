"use strict";
// Some standard user-input events. Define handling of these events here.
// for easy changing of arrow keys <--> WASD
const upKey = "w";
const leftKey = "a";
const downKey = "s";
const rightKey = "d";
// Didn't want a down down variable, so I stuck with the letters
let wDown = 0;
let aDown = 0;
let sDown = 0;
let dDown = 0;
let player = new Player(.5, .5);
;
window.addEventListener("load", function () {
    //Handle when the whole page finishes loading
    //Use this to "set up" the initial state of things;
    //Often, this includes populating the actorList.
    // A sample:
    actorList.addActor(player);
});
canvas.addEventListener("click", function (event) {
    //Handle click events
    //Get position of click on canvas: event.offsetX, event.offsetY
});
document.addEventListener("keydown", function (event) {
    //Handle keydown events
    //Get the key that was pressed: event.key
    // if (event.key === "ArrowLeft")
    //     player.xVelocity = -5;
    // if (event.key === "ArrowRight")
    //     player.xVelocity = 5;
    // if (event.key === "ArrowUp")
    //     player.yVelocity = -5;
    // if (event.key === "ArrowDown")
    //     player.yVelocity = 5;
    if (event.key === leftKey) {
        player.xVelocity = -5;
        aDown = 1;
    }
    if (event.key === rightKey) {
        player.xVelocity = 5;
        dDown = 1;
    }
    if (event.key === upKey) {
        player.yVelocity = -5;
        wDown = 1;
    }
    if (event.key === downKey) {
        player.yVelocity = 5;
        sDown = 1;
    }
});
document.addEventListener("keyup", function (event) {
    //Handle keydown events
    //Get the key that was released: event.key
    // if (event.key === "ArrowLeft" || event.key === "ArrowRight")
    //     player.xVelocity = 0;
    // if (event.key === "ArrowUp" || event.key === "ArrowDown")
    //     player.yVelocity = 0;
    if (event.key === leftKey) {
        aDown = 0;
        if (dDown) {
            player.xVelocity = 5;
        }
        else {
            player.xVelocity = 0;
        }
    }
    if (event.key === rightKey) {
        dDown = 0;
        if (aDown) {
            player.xVelocity = -5;
        }
        else {
            player.xVelocity = 0;
        }
    }
    if (event.key === upKey) {
        wDown = 0;
        if (sDown) {
            player.yVelocity = 5;
        }
        else {
            player.yVelocity = 0;
        }
    }
    if (event.key === downKey) {
        sDown = 0;
        if (wDown) {
            player.yVelocity = -5;
        }
        else {
            player.yVelocity = 0;
        }
    }
});
// Add more event handlers:
// Examples include:
// canvas.addEventListener("mousemove",function(event: MouseEvent) {...});
// canvas.addEventListener("mousedown",function(event: MouseEvent) {...});
// canvas.addEventListener("mouseup",function(event: MouseEvent) {...});
// Use setTimeout() for time-based events that will occur once
// Use setInterval() for time-based events that will occur regularly
//Define any global variables for tracking input states between events:
// Some samples:
// let lastMousePosition = {x: 0, y:0};
// let keysStatus = {leftKeyDown: false, rightKeyDown: false};
setInterval(function () {
    actorList.addActor(new Fruit(.25 + Math.random() * .5, -.1));
}, 2000);
setTimeout(createRock, Math.random() * 2000 + 1000);
function createRock() {
    actorList.addActor(new Rock(.25 + Math.random() * .5, -.1));
    setTimeout(createRock, Math.random() * 2000 + 1000);
}
// setInterval(function () {
//     actorList.addActor(new Flower(Math.random() * (620) + 690, (Math.random() * (620) + 690),50));
// }, 2000);
