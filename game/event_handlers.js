// Some standard user-input events. Define handling of these events here.
var player = new Player(canvas.width / 2, canvas.height / 2);
window.addEventListener("load", function () {
    //Handle when the whole page finishes loading
    //Use this to "set up" the initial state of things;
    //Often, this includes populating the actorList.
    // A sample:
    actorList.addActor(player);
    var rock = new Rock(canvas.width / 2, 10);
    actorList.addActor(rock);
    var fruit = new Fruit(canvas.width / 2, 100);
    actorList.addActor(fruit);
});
canvas.addEventListener("click", function (event) {
    //Handle click events
    //Get position of click on canvas: event.offsetX, event.offsetY
});
document.addEventListener("keydown", function (event) {
    //Handle keydown events
    //Get the key that was pressed: event.key
    if (event.key === "ArrowLeft")
        player.xVelocity = -5;
    if (event.key === "ArrowRight")
        player.xVelocity = 5;
    if (event.key === "ArrowUp")
        player.yVelocity = -5;
    if (event.key === "ArrowDown")
        player.yVelocity = 5;
});
document.addEventListener("keyup", function (event) {
    //Handle keydown events
    //Get the key that was released: event.key
    if (event.key === "ArrowLeft" || event.key === "ArrowRight")
        player.xVelocity = 0;
    if (event.key === "ArrowUp" || event.key === "ArrowDown")
        player.yVelocity = 0;
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
    actorList.addActor(new Fruit(Math.random() * (620) + 690, -50));
}, 2000);
setTimeout(createRock, Math.random() * 2000 + 1000);
function createRock() {
    actorList.addActor(new Rock(Math.random() * (620) + 690, -50));
    setTimeout(createRock, Math.random() * 2000 + 1000);
}
