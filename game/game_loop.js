var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var FRAME_LENGTH = 30;
var actorList = new ActorList();
//Draw ~ 30 times a second
var drawIntervalId = window.setInterval(draw, FRAME_LENGTH);
function draw() {
    // Clear the stage!
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw playspace
    ctx.strokeStyle = "#ffe599";
    ctx.lineWidth = 7;
    ctx.strokeRect(610, 190, 700, 700);
    // Re-draw all the actors!
    for (var _i = 0, _a = actorList.actors; _i < _a.length; _i++) {
        var actor = _a[_i];
        actor.draw();
    }
    //Update all actors
    for (var _b = 0, _c = actorList.actors; _b < _c.length; _b++) {
        var actor = _c[_b];
        actor.update();
    }
}
// Functions to control (pause/continue) the game loop.
function pauseDrawing() {
    if (drawIntervalId !== undefined)
        clearInterval(drawIntervalId);
    drawIntervalId = undefined;
}
function continueDrawing() {
    if (drawIntervalId === undefined)
        drawIntervalId = window.setInterval(draw, FRAME_LENGTH);
}
document.querySelector("#pause").addEventListener("click", pauseDrawing);
document.querySelector("#continue").addEventListener("click", continueDrawing);
