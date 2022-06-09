const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let file = new FileReader()
let orders :string[];
let afile;
document.getElementById('inputFile').addEventListener('change', function() {
    
    file.readAsText(this.files[0]);
    file.onload = () => {
      document.getElementById('output').textContent = file.result;
      orders = file.result.split("\r\n")
      console.log(orders)
      afile = new Audio("../audio/"+orders[0])
      afile.load()
      afile.play()

    }
    
  });
const FRAME_LENGTH = 30
const actorList = new ActorList();
let size : number;
let shiftX : number;
let shiftY : number;
const backgroundColor : string = "#252525";

// Max health and current health

let mxHth : number = 50;
let pHth : number = 50;

//Draw ~ 30 times a second
let drawIntervalId : number | undefined = window.setInterval(draw, FRAME_LENGTH);

function draw(){
    // Clear the stage!
   
    ctx.canvas.width  = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight - 20;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0,0,canvas.width, canvas.height);
    // draw playspace
    ctx.fillStyle = "#ffe599";
    
    size = Math.min(2*canvas.width/3,2*canvas.height/3)
    shiftX = (canvas.width-size)/2
    shiftY = (canvas.height-size)/2
    ctx.fillRect(shiftX-size/50,shiftY-size/50, size+size/25, size+size/25);
    ctx.fillStyle = backgroundColor
    ctx.fillRect(shiftX,shiftY, size, size);
    for (const actor of actorList.actors){
        actor.draw();
    }
    player.draw()

    //Update all actors
    for (const actor of actorList.actors){
        actor.update();
    }

    // Temporary (?) Health Bar Stuff

    for (let i=0;i<mxHth;i++){
        if (i <pHth){
            ctx.fillStyle = "#32a852";
        }
        else{
            ctx.fillStyle = "#a83225";
        }
        ctx.fillRect(shiftX+size/75+i*size/mxHth,shiftY+size+size/16, -2*size/75+size/mxHth, size/8);

    }
    
    


    // Re-draw all the actors!
    
}

// Functions to control (pause/continue) the game loop.

function pauseDrawing(){
    if (drawIntervalId !== undefined)
        clearInterval(drawIntervalId);
    drawIntervalId = undefined;
}

function continueDrawing(){
    if (drawIntervalId === undefined)
        drawIntervalId = window.setInterval(draw, FRAME_LENGTH);
}

(document.querySelector("#pause") as HTMLElement).addEventListener("click",pauseDrawing);
(document.querySelector("#continue") as HTMLElement).addEventListener("click",continueDrawing);
