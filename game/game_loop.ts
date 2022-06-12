



const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

//Snatched this off of stackoverflow tehehe
window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
let isMobile = window.mobileCheck();
let file = new FileReader()
let orders :string[];
let afile;
let deathsound = new Audio("../audio/AWW.mp3")
let boomsound = new Audio("../audio/BOOM3.mp3")
let winsound = new Audio("../audio/YAYYY.mp3")
let playing = false;
let playing2 = false;
let difficulty = 1;
let maxDifficulty = 4;
let screeeen = 0;
let isStarting = 0;
let difHts = [100,10,5,3,1]
let difColsBord = ["#125e34","#737d1e","#7d601e","#7d1e1e"]
let difCols = ["green","yellow","orange","#ab2929"]
let difNames = ["Nonexistent","EASY","NORMAL","HARD","!!DEATH!!"]
// 1 is loss, 2 is win, 0 is in progress
let gameState = 0
document.getElementById('inputFile').addEventListener('change', function() {
    
    file.readAsText(this.files[0]);
    file.onload = () => {
      document.getElementById('output').textContent = file.result;
     // orders = file.result.split("\r\n")
     orders = battles[0].split("\n")
      console.log(orders)
      afile = new Audio("../audio/"+orders[0])
      afile.load()
      setTimeout(function(){
          afile.play()
          playing2 = true;
      },1000)
      playing = true;

    }
    
  });
const FRAME_LENGTH = 30
const FPS = 1000/FRAME_LENGTH
const actorList = new ActorList();
let size : number;
let shiftX : number;
let shiftY : number;
const backgroundColor : string = "#252525";

// Max health and current health

let mxHth : number = 10;
let pHth : number = 10;
let curFrame = 1;
let curFrame2 = 1;
//Draw ~ 30 times a second
let drawIntervalId : number | undefined = window.setInterval(draw, FPS);

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
    if (gameState ==1){
        ctx.font = `${size/4}px Helvetica`;
        ctx.textAlign = "center"
        ctx.fillStyle = "#1451e0"
        ctx.fillText('YOU DIED', canvas.width/2, canvas.height/3);
        ctx.font = `${size/8}px Helvetica`;
        ctx.fillText(`TRY AGAIN?`, canvas.width/2, 3*canvas.height/4);
        afile.pause();
        ctx.fillStyle = "#db9039";
        ctx.fillRect(shiftX+size/3,shiftY+size/3, size/3, size/3);
        
        ctx.fillStyle = backgroundColor
        ctx.beginPath();
        ctx.moveTo(shiftX+size/3+size*2/9, shiftY+size/3+size*1/6);        
        ctx.lineTo(shiftX+size/3+size*1/9, shiftY+size/3+size*2/9);
        ctx.lineTo(shiftX+size/3+size*1/9, shiftY+size/3+size*1/9);
        ctx.fill();
        
    }
    else if (gameState==2){

        ctx.font = `${size/4}px Arial`;
        ctx.textAlign = "center"
        ctx.fillStyle = "red"
        ctx.fillText(`YOU WIN`, canvas.width/2, canvas.height/5);
        ctx.font = `${size/6}px Arial`;
        let difName = difNames[difficulty];
        ctx.fillStyle = `${difCols[difficulty-1]}`
        ctx.fillText(`${difName} MODE`, canvas.width/2, canvas.height/(3))
        ctx.fillStyle = "red"
        ctx.font = `${size/8}px Arial`;
        ctx.fillText(`PLAY AGAIN?`, canvas.width/2, 3*canvas.height/4);
        afile.pause();
        ctx.fillStyle = "#db9039";
        ctx.fillRect(shiftX+size/3,shiftY+size/3, size/3, size/3);
        
        ctx.fillStyle = backgroundColor
        ctx.beginPath();
        ctx.moveTo(shiftX+size/3+size*2/9, shiftY+size/3+size*1/6);        
        ctx.lineTo(shiftX+size/3+size*1/9, shiftY+size/3+size*2/9);
        ctx.lineTo(shiftX+size/3+size*1/9, shiftY+size/3+size*1/9);
        ctx.fill();
      
    }
    else if (playing){
        
        
        ctx.fillRect(shiftX-size/50,shiftY-size/50, size+size/25, size+size/25);
        ctx.fillStyle = backgroundColor
         ctx.fillRect(shiftX,shiftY, size, size);
        if (playing){
            if (curFrame2 < orders.length)
                readattack(curFrame2);
            curFrame ++;
            if (isMobile &&curFrame==902){
                curFrame+=19;
            }
            if (isMobile &&curFrame==1902){
                curFrame+=19;
            }
            if (isMobile &&curFrame==2902){
                curFrame+=19;
            }
        }
        for (const actor of actorList.actors){
            actor.draw();
        }
        player.draw()

        //Update all actors
        for (const actor of actorList.actors){
            actor.update();
        }

        // Temporary (?) Health Bar Stuff
        let end = orders[orders.length-1]
        end = end.split(" ")[0]
        ctx.fillStyle = "#39754a";
        ctx.fillRect(shiftX,shiftY-16*size/75, size, 2*(16*size/75-size/5)+size/10);
        ctx.fillStyle = "#a83225";
        ctx.fillRect(shiftX+size/75,shiftY-size/5, -2*size/75+size, size/10);
        ctx.fillStyle = "#32a852";
        ctx.fillRect(shiftX+size/75,shiftY-size/5, (-2*size/75+size)*(curFrame/Number(end)), size/10);

        for (let i=0;i<mxHth;i++){
            if (i <pHth){
                ctx.fillStyle = "#32a852";
            }
            else{
                ctx.fillStyle = "#a83225";
            }
            ctx.fillRect(shiftX+size/75+i*size/mxHth,shiftY+size+size/16, -2*size/75+size/mxHth, size/8);

        }
    }
    else{
        ctx.textAlign = "center"
        ctx.fillStyle = "darkgreen"
        ctx.font = `${size/4}px Helvetica`;
        ctx.fillText('CLICK', canvas.width/2, canvas.height/3);

        ctx.fillStyle = "#32a852";
        ctx.fillRect(shiftX+size/3,shiftY+size/3, size/3, size/3);
        
        ctx.fillStyle = backgroundColor
        ctx.beginPath();
        ctx.moveTo(shiftX+size/3+size*2/9, shiftY+size/3+size*1/6);        
        ctx.lineTo(shiftX+size/3+size*1/9, shiftY+size/3+size*2/9);
        ctx.lineTo(shiftX+size/3+size*1/9, shiftY+size/3+size*1/9);
        ctx.fill();
        for (let i=0;i<maxDifficulty;i++){
            
            if (i+1==difficulty){
                ctx.fillStyle = difColsBord[i]
                ctx.fillRect(shiftX+size/75+i*size/maxDifficulty,shiftY+3*size/4 - (size/7-size/8)/2, -2*size/75+size/maxDifficulty, size/7);
            }
            ctx.fillStyle = difCols[i]
            ctx.fillRect(shiftX+size/50+i*size/maxDifficulty,shiftY+3*size/4, -2*size/50+size/maxDifficulty, size/8);
            
        }
        ctx.fillStyle = difCols[difficulty-1]
        ctx.font = `${size/8}px Helvetica`;
        ctx.fillText(`${difNames[difficulty]}`, canvas.width/2, 7*canvas.height/8);
    }
    if (isWinning==1){
        screeeen++;
        if (screeeen > 30){
            isWinning = 2
            gameState = 2
            winsound.load()
            winsound.play()
        }
    }
    else if (isWinning==2){
        screeeen--;
        if (screeeen<=0){
            screeeen=0;
            isWinning = 0;

        }
    }
    if (isDying==1){
        screeeen+=.5;
        if (screeeen > 30){
            isDying = 2
            gameState = 1
            deathsound.load()
            deathsound.play()
        }
    }
    else if (isDying==2){
        screeeen--;
        if (screeeen<=0){
            screeeen=0;
            isDying = 0;
        }

    }
   
    if (isStarting==1){
        screeeen+=4;
        if (screeeen > 30){
            playing = true;
            isStarting = 2
            orders = battles[0].split("\n")
                console.log(orders)
                afile = new Audio("../audio/"+orders[0])
                afile.load()
                setTimeout(function(){
                    afile.play()
                    playing2 = true;
                },1000)
                playing = true;
                gameState = 0;
            
        }
    }
    else if (isStarting==2){
        screeeen-= 4;
        if (screeeen<=0){
            screeeen=0;
            isStarting = 0;
        }
    }
    ctx.fillStyle = "rgba(0, 0, 0, " + screeeen / 29 + ")";
    ctx.fillRect(0,0,canvas.width, canvas.height);


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
