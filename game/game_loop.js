"use strict";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let file = new FileReader();
let orders;
let afile;
let playing = false;
let playing2 = false;
let difficulty = 1;
let maxDifficulty = 4;
let difHts = [100, 10, 5, 3, 1];
let difColsBord = ["#125e34", "#737d1e", "#7d601e", "#7d1e1e"];
let difCols = ["green", "yellow", "orange", "#ab2929"];
// 1 is loss, 2 is win, 0 is in progress
let gameState = 0;
document.getElementById('inputFile').addEventListener('change', function () {
    file.readAsText(this.files[0]);
    file.onload = () => {
        document.getElementById('output').textContent = file.result;
        // orders = file.result.split("\r\n")
        orders = battles[0].split("\n");
        console.log(orders);
        afile = new Audio("../audio/" + orders[0]);
        afile.load();
        setTimeout(function () {
            afile.play();
            playing2 = true;
        }, 1000);
        playing = true;
    };
});
const FRAME_LENGTH = 30;
const FPS = 1000 / FRAME_LENGTH;
const actorList = new ActorList();
let size;
let shiftX;
let shiftY;
const backgroundColor = "#252525";
// Max health and current health
let mxHth = 10;
let pHth = 10;
let curFrame = 1;
let curFrame2 = 1;
//Draw ~ 30 times a second
let drawIntervalId = window.setInterval(draw, FPS);
function draw() {
    // Clear the stage!
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight - 20;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw playspace
    ctx.fillStyle = "#ffe599";
    size = Math.min(2 * canvas.width / 3, 2 * canvas.height / 3);
    shiftX = (canvas.width - size) / 2;
    shiftY = (canvas.height - size) / 2;
    if (gameState == 1) {
        ctx.font = `${size / 3}px serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "blue";
        ctx.fillText('YOU DIED', canvas.width / 2, canvas.height / 3);
        afile.pause();
    }
    else if (gameState == 2) {
        ctx.font = `${size / 3}px serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "red";
        ctx.fillText(`YOU WIN ${difficulty}`, canvas.width / 2, canvas.height / 3);
        afile.pause();
    }
    else if (playing) {
        ctx.fillRect(shiftX - size / 50, shiftY - size / 50, size + size / 25, size + size / 25);
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(shiftX, shiftY, size, size);
        if (playing) {
            if (curFrame2 < orders.length)
                readattack(curFrame2);
            curFrame++;
        }
        for (const actor of actorList.actors) {
            actor.draw();
        }
        player.draw();
        //Update all actors
        for (const actor of actorList.actors) {
            actor.update();
        }
        // Temporary (?) Health Bar Stuff
        for (let i = 0; i < mxHth; i++) {
            if (i < pHth) {
                ctx.fillStyle = "#32a852";
            }
            else {
                ctx.fillStyle = "#a83225";
            }
            ctx.fillRect(shiftX + size / 75 + i * size / mxHth, shiftY + size + size / 16, -2 * size / 75 + size / mxHth, size / 8);
        }
    }
    else {
        ctx.fillStyle = "#32a852";
        ctx.fillRect(shiftX + size / 3, shiftY + size / 3, size / 3, size / 3);
        ctx.fillStyle = backgroundColor;
        ctx.beginPath();
        ctx.moveTo(shiftX + size / 3 + size * 2 / 9, shiftY + size / 3 + size * 1 / 6);
        ctx.lineTo(shiftX + size / 3 + size * 1 / 9, shiftY + size / 3 + size * 2 / 9);
        ctx.lineTo(shiftX + size / 3 + size * 1 / 9, shiftY + size / 3 + size * 1 / 9);
        ctx.fill();
        for (let i = 0; i < maxDifficulty; i++) {
            if (i + 1 == difficulty) {
                ctx.fillStyle = difColsBord[i];
                ctx.fillRect(shiftX + size / 75 + i * size / maxDifficulty, shiftY + 3 * size / 4 - (size / 7 - size / 8) / 2, -2 * size / 75 + size / maxDifficulty, size / 7);
            }
            ctx.fillStyle = difCols[i];
            ctx.fillRect(shiftX + size / 50 + i * size / maxDifficulty, shiftY + 3 * size / 4, -2 * size / 50 + size / maxDifficulty, size / 8);
        }
    }
    // Re-draw all the actors!
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
