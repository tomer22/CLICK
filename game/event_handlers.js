// Some standard user-input events. Define handling of these events here.
// for easy changing of arrow keys <--> WASD
var upKey = "w";
var leftKey = "a";
var downKey = "s";
var rightKey = "d";
var circles = 1;
// Didn't want a down down variable, so I stuck with the letters
var wDown = 0;
var aDown = 0;
var sDown = 0;
var dDown = 0;
var player = new Player(.5, .5);
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
    if (event.key === "p") {
        circles++;
        circles %= 4;
    }
    if (event.key === leftKey || event.key === "ArrowLeft") {
        player.xVelocity = -5 / (500);
        aDown = 1;
    }
    if (event.key === rightKey || event.key === "ArrowRight") {
        player.xVelocity = 5 / (500);
        dDown = 1;
    }
    if (event.key === upKey || event.key === "ArrowUp") {
        player.yVelocity = -5 / (500);
        wDown = 1;
    }
    if (event.key === downKey || event.key === "ArrowDown") {
        player.yVelocity = 5 / (500);
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
    if (event.key === leftKey || event.key === "ArrowLeft") {
        aDown = 0;
        if (dDown) {
            player.xVelocity = 5 / (500);
        }
        else {
            player.xVelocity = 0;
        }
    }
    if (event.key === rightKey || event.key === "ArrowRight") {
        dDown = 0;
        if (aDown) {
            player.xVelocity = -5 / (500);
        }
        else {
            player.xVelocity = 0;
        }
    }
    if (event.key === upKey || event.key === "ArrowUp") {
        wDown = 0;
        if (sDown) {
            player.yVelocity = 5 / (500);
        }
        else {
            player.yVelocity = 0;
        }
    }
    if (event.key === downKey || event.key === "ArrowDown") {
        sDown = 0;
        if (wDown) {
            player.yVelocity = -5 / (500);
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
// setInterval( function() {
//     if (circles==1){
//         healBall();}
// }, 700)
// Draw healing ball
function healBall() {
    actorList.addActor(new Fruit(Math.random()));
}
// Draw harmful balls in an interval
setInterval(function () {
    if (circles == 1) {
        pealBall();
        //patternCircles(0,sign);
    }
}, 150);
// Changes the attack every 5 secs
setInterval(function () {
    circles++;
    circles %= 5;
}, 5000);
// Summon swords from some direction every so often
setInterval(function () {
    if (!circles) {
        swordRain();
        //funkyRain();
    }
}, 1200);
// Create telegraph for attack, then do said wall attack after some time in a random spot
setInterval(function () {
    if (circles == 2) {
        var side_1 = Math.floor(Math.random() * 4);
        var count_1 = 5;
        var spot_1 = Math.floor(Math.random() * count_1);
        var delay = 1000;
        slamWarning(side_1, count_1, spot_1, delay);
        setTimeout(function () { slam(side_1, count_1, spot_1); }, delay);
    }
}, 500);
// Squares appear in ground
setInterval(function () {
    if (circles == 3) {
        mettaton();
    }
}, 250);
// Currently the sin graph
setInterval(function () {
    if (circles == 4) {
        patternCircles(0, sign);
        //funkyRain();
    }
}, 100);
// Pattern circles accepts a function which dictates x -> y
function patternCircles(lead, f) {
    actorList.addActor(new PatternRock(lead, f));
}
;
function sign(x) {
    var spot = Math.sin(x * 3 * Math.PI);
    return (spot + 1) / 2;
}
// Creates expanding squares in a random spot
function mettaton() {
    var count = 5;
    var hex = Math.floor(Math.random() * count);
    var hi = Math.floor(Math.random() * count);
    actorList.addActor(new expandingSquare((hex + .5) / count, (hi + .5) / count, .01, 1 / count, 50));
}
// Creates a set of triangles pointing in certain directions for telegraphing
function slamWarning(side, count, spot, delay) {
    var b = 1 / (count * 2);
    var h = .5 / (count * 2);
    var warnings = 5;
    for (var i = -warnings / 2; i < warnings / 2; i++) {
        if (side === 0) {
            actorList.addActor(new Warning((Math.floor(spot) + .5) / count, .5 + (i + .5) / (warnings), b, h, 0, delay / 25));
        }
        if (side === 1) {
            actorList.addActor(new Warning(.5 + (i + .5) / (warnings), (Math.floor(spot) + .5) / count, b, h, 1, delay / 25));
        }
        if (side === 2) {
            actorList.addActor(new Warning(.5 + (i + .5) / (warnings), (Math.floor(spot) + .5) / count, b, h, 2, delay / 25));
        }
        if (side === 3) {
            actorList.addActor(new Warning((Math.floor(spot) + .5) / count, .5 + (i + .5) / (warnings), b, h, 3, delay / 25));
        }
    }
}
// Creates the evil wall which slams, then retracts
function slam(side, count, spot) {
    var speed = .06;
    if (side === 0) {
        actorList.addActor(new evilWall((Math.floor(spot) + .5) / count, 0, 1 / count, 0, 0, speed));
    }
    if (side === 1) {
        actorList.addActor(new evilWall(0, (Math.floor(spot) + .5) / count, 0, 1 / count, speed, 0));
    }
    if (side === 2) {
        actorList.addActor(new evilWall(1, (Math.floor(spot) + .5) / count, 0, 1 / count, -speed, 0));
    }
    if (side === 3) {
        actorList.addActor(new evilWall((Math.floor(spot) + .5) / count, 1, 1 / count, 0, 0, -speed));
    }
}
// summons swords from one of three directions
function swordRain(count, speed) {
    if (count === void 0) { count = Math.random() * 4 + 5; }
    if (speed === void 0) { speed = Math.random() / 500 + .009; }
    var side = Math.floor(Math.random() * 3);
    var width = (.3 * 6) / (Math.pow(count, 2));
    if (side === 0) {
        //Commented out versions do funky stuff, might be cool but not what was intended here specifically
        for (var i = 0; i < count; i++) {
            // actorList.addActor(new Sword((i+Math.random()*.5+.25)/count,-1,width,.2,0,Math.random()/100+.005))
            actorList.addActor(new Sword((i + Math.random() * .5 + .25) / (count + .5), -.2, width, .2, 0, speed));
        }
    }
    else if (side === 1) {
        for (var i = 0; i < count; i++) {
            // actorList.addActor(new Sword(-1,(i+Math.random()*.5+.25)/count,.2,width,Math.random()/100+.005,0))
            actorList.addActor(new Sword(-.2, (i + Math.random() * .5 + .25) / (count + .5), .2, width, speed, 0));
        }
    }
    else if (side === 2) {
        for (var i = 0; i < count; i++) {
            // actorList.addActor(new Sword(2,(i+Math.random()*.5+.25)/count,.2,width,-(Math.random()/100+.005),0))
            actorList.addActor(new Sword(1.2, (i + Math.random() * .5 + .25) / (count + .5), .2, width, -speed, 0));
        }
    }
    else {
        console.log("How'd that happen?");
    }
}
// Like swordRain, but each sword has individual speed
function funkyRain(count, speed) {
    if (count === void 0) { count = Math.random() * 4 + 5; }
    if (speed === void 0) { speed = Math.random() / 100 + .005; }
    var side = Math.floor(Math.random() * 3);
    var width = .3 / count;
    if (side === 0) {
        //Commented out versions do funky stuff, might be cool but not what was intended here specifically
        // Nvm I quite like the funky stuff
        for (var i = 0; i < count - 1; i++) {
            actorList.addActor(new Sword((i + Math.random() * .5 + .25) / count, -1, width, .2, 0, Math.random() / 100 + .005));
            //actorList.addActor(new Sword((i+Math.random()*.5+.25)/count,-1,width,.2,0,speed))
        }
    }
    else if (side === 1) {
        for (var i = 0; i < count - 1; i++) {
            actorList.addActor(new Sword(-1, (i + Math.random() * .5 + .25) / count, .2, width, Math.random() / 100 + .005, 0));
            //actorList.addActor(new Sword(-1,(i+Math.random()*.5+.25)/count,.2,width,speed,0))
        }
    }
    else if (side === 2) {
        for (var i = 0; i < count - 1; i++) {
            actorList.addActor(new Sword(2, (i + Math.random() * .5 + .25) / count, .2, width, -(Math.random() / 100 + .005), 0));
            //actorList.addActor(new Sword(2,(i+Math.random()*.5+.25)/count,.2,width,-speed,0))
        }
    }
}
// Summons hurt 
function pealBall() {
    actorList.addActor(new Rock(Math.random()));
}
// setTimeout(createRock, Math.random() * 2000 + 1000);
// function createRock(){
//     actorList.addActor( new Rock(Math.random()));
//     //setTimeout(createRock, Math.random() * 2000 + 1000);
//     setTimeout(createRock, Math.random() *100 + 100);
// }
// // setInterval(function () {
//     actorList.addActor(new Flower(Math.random() * (620) + 690, (Math.random() * (620) + 690),50));
// }, 2000);
