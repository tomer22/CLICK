// Some standard user-input events. Define handling of these events here.


// for easy changing of arrow keys <--> WASD
const upKey = "w"
const leftKey = "a"
const downKey = "s"
const rightKey = "d"
let attacks = [];
let circles = 6;
// Didn't want a down down variable, so I stuck with the letters
let isWinning = 0;
let wDown = 0;
let aDown = 0;
let sDown = 0;
let dDown = 0;
let isDying = 0;
let isDead =0;
let player : Player; 


window.addEventListener("load", function() {
    //Handle when the whole page finishes loading
    //Use this to "set up" the initial state of things;

    //Often, this includes populating the actorList.
    // A sample:
        onStart()
   
   
    


})
function onStart(){
    for (let attackk of attacks){
        clearInterval(attackk);
    }
    actorList.removeAllActors()
    player = new Player(.5,.5);; 
    actorList.addActor(player);
  
    attacks = [];
    circles = 6;
    // Didn't want a down down variable, so I stuck with the letters
    isWinning = 0;
    wDown = 0;
    aDown = 0;
    sDown = 0;
    dDown = 0;
    tLength = 7;
    positions = [];
     curFrame = 1;
     curFrame2 = 1;
    mxHth = 10;
    pHth  = 10;
    gameState = 0;
  
    playing = false;
    playing2 = false;
    difficulty = 1;

    screeeen = 0;
    isStarting = 0;
    isDying = 0;
    isDead = 0;
        
}

canvas.addEventListener("click", function(event: MouseEvent) {
    //Handle click events
    //Get position of click on canvas: event.offsetX, event.offsetY
    if (!playing){
        if (event.offsetX > shiftX+size/3 && event.offsetX < shiftX + 2*size/3 && event.offsetY > shiftY+size/3 && event.offsetY < shiftY + 2*size/3){
            if (isMobile){
            if (event.offsetX > shiftX+size/3 && event.offsetX < shiftX + 2*size/3 && event.offsetY > shiftY+size/3 && event.offsetY < shiftY + 2*size/3){
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
        else{
            isStarting = 1;
        }
            
        }
        for (let i=0;i<maxDifficulty;i++){
                
            if(event.offsetX > shiftX+size/50+i*size/maxDifficulty && event.offsetX < shiftX+size/50+i*size/maxDifficulty - 2*size/50+size/maxDifficulty &&
            event.offsetY > shiftY+3*size/4 && event.offsetY < shiftY+3*size/4+ size/8){
                difficulty = i+1
                mxHth = difHts[difficulty]
                pHth = difHts[difficulty]
            }
            
        }
    }
    if (gameState == 1 || gameState == 2){
        if (event.offsetX > shiftX+size/3 && event.offsetX < shiftX + 2*size/3 && event.offsetY > shiftY+size/3 && event.offsetY < shiftY + 2*size/3){
            onStart();
        }
    }
});

document.addEventListener("keydown", function(event: KeyboardEvent){
    if (event.key==="p"){
        circles++;
        circles%=7;
    }
     if (event.key === leftKey || event.key === "ArrowLeft"){
        player.xVelocity = -5/(500);
        aDown = 1;
    }
    if (event.key === rightKey || event.key === "ArrowRight"){
        player.xVelocity = 5/(500);
        dDown = 1;
    }
    if (event.key === upKey || event.key === "ArrowUp"){
        player.yVelocity = -5/(500);
        wDown = 1;
    }
    if (event.key === downKey || event.key === "ArrowDown"){
        player.yVelocity = 5/(500);
        sDown = 1;
    }

});

document.addEventListener("keyup", function(event:KeyboardEvent){
    //Handle keydown events
    //Get the key that was released: event.key
    // if (event.key === "ArrowLeft" || event.key === "ArrowRight")
    //     player.xVelocity = 0;
    // if (event.key === "ArrowUp" || event.key === "ArrowDown")
    //     player.yVelocity = 0;
    if (event.key === leftKey || event.key === "ArrowLeft"){
        aDown = 0;
        if (dDown){
            player.xVelocity = 5/(500);
        }
        else{
            player.xVelocity = 0;
        }
    }
        
        
    if (event.key === rightKey || event.key === "ArrowRight"){
        dDown = 0;
        if (aDown){
            player.xVelocity = -5/(500);
        }
        else{
            player.xVelocity = 0;
        }
    }
    if (event.key === upKey || event.key === "ArrowUp"){
        wDown = 0;
        if (sDown){
            player.yVelocity = 5/(500);
        }
        else{
            player.yVelocity = 0;
        }
    }
    if (event.key === downKey || event.key === "ArrowDown"){
        sDown = 0;
        if (wDown){
            player.yVelocity = -5/(500);
        }
        else{
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
    actorList.addActor( new Fruit(Math.random()))
}


// Draw harmful balls in an interval
setInterval( function() {
    if (circles==1){
       // pealBall();
        //patternCircles(0,sign);
    }
}, 150)


// Changes the attack every 5 secs
setInterval(function() {
    // circles++;
    // circles%=6;
}, 5000)


// Summon swords from some direction every so often

setInterval( function() {
    if (!circles){
        swordRain();
        //funkyRain();
    }
    
}, 1200)


// Create telegraph for attack, then do said wall attack after some time in a random spot

setInterval( function() {
    if (circles==2){
        let side = Math.floor(Math.random()*4);
        let count = 8;
        let spot = Math.floor(Math.random()*count)
        let delay = 800;
        slamWarning(side,count,spot,delay)
        setTimeout(function(){slam(side,count,spot);},delay)
    }
}, 200)

// Squares appear in ground

setInterval( function() {
    if (circles==3){
        mettaton();
        
    }
    
}, 250)


// Currently the sin graph

setInterval( function() {
    if (circles==4){
        patternCircles(0,sign);
        
        //funkyRain();
    }
    
}, 100)


setInterval( function() {
    if (circles===5){
        bombs();
        bombz();
        //funkyRain();
    }
    
}, 1000)

function bombs() {
    actorList.addActor( new LaserBomb(Math.random()*.8+.1,Math.random()*.8+.1,90));
};

function bombz() {
    actorList.addActor( new CircleBomb(Math.random()*.8+.1,Math.random()*.8+.1,90));
};
// Pattern circles accepts a function which dictates x -> y
function patternCircles(lead:number,f:Function) {
    actorList.addActor( new PatternRock(lead,f));
};
function sign(x:number){
    let spot = Math.sin(x*3*Math.PI)
    return (spot+1)/2
}

// Creates expanding squares in a random spot
function mettaton(c=5,x=Math.floor(Math.random()*5),y=Math.floor(Math.random()*5)){
    let count = c;
    let hex = x
    let hi = y
    actorList.addActor(new expandingSquare((hex+.5)/count,(hi+.5)/count,.01,1/count,30));
}


// Creates a set of triangles pointing in certain directions for telegraphing
function slamWarning(side:number,count:number,spot:number,delay:number){
    let b = 1/(count*2)
    let h = .5/(count*2)
    let warnings = 5;
    for (let i =-warnings/2;i<warnings/2;i++){
    if (side===0){
        
        actorList.addActor(new Warning((Math.floor(spot)+.5)/count,.5+(i+.5)/(warnings),b,h,0,delay/25))
    }
    if (side===1){
        actorList.addActor(new Warning(.5+(i+.5)/(warnings),(Math.floor(spot)+.5)/count,b,h,1,delay/25))
    }
    if (side===2){
        actorList.addActor(new Warning(.5+(i+.5)/(warnings),(Math.floor(spot)+.5)/count,b,h,2,delay/25))
    }
    if (side===3){
        
        actorList.addActor(new Warning((Math.floor(spot)+.5)/count,.5+(i+.5)/(warnings),b,h,3,delay/25))
    }

}
}


// Creates the evil wall which slams, then retracts
function slam(side:number,count:number,spot:number){
    
    let speed = .06
    if (side===0){
        actorList.addActor(new evilWall((Math.floor(spot)+.5)/count,0,1/count,0,0,speed))
    }
    if (side===1){
        actorList.addActor(new evilWall(0,(Math.floor(spot)+.5)/count,0,1/count,speed,0))
    }
    if (side===2){
        actorList.addActor(new evilWall(1,(Math.floor(spot)+.5)/count,0,1/count,-speed,0))
    }
    if (side===3){
        actorList.addActor(new evilWall((Math.floor(spot)+.5)/count,1,1/count,0,0,-speed))
    }

}


// summons swords from one of three directions
function swordRain(count:number = Math.random()*4+5,speed:number= Math.random()/500+.009, sid:number = Math.floor(Math.random()*3)) {

    let side = sid;

    let width = (.3*6)/(count**2);
  
    if (side===0){
        //Commented out versions do funky stuff, might be cool but not what was intended here specifically
        for (let i=0;i<count;i++){
            
            // actorList.addActor(new Sword((i+Math.random()*.5+.25)/count,-1,width,.2,0,Math.random()/100+.005))
            actorList.addActor(new Sword((i+Math.random()*.5+.25)/(count),-.2,width,.2,0,speed))
        }
    }
    else if (side===1){
        for (let i=0;i<count;i++){
            
            
            // actorList.addActor(new Sword(-1,(i+Math.random()*.5+.25)/count,.2,width,Math.random()/100+.005,0))
            actorList.addActor(new Sword(-.2,(i+Math.random()*.5+.25)/(count),.2,width,speed,0))
        }
    }
    else if (side===2){
        for (let i=0;i<count;i++){
            
            // actorList.addActor(new Sword(2,(i+Math.random()*.5+.25)/count,.2,width,-(Math.random()/100+.005),0))
            actorList.addActor(new Sword(1.2,(i+Math.random()*.5+.25)/(count),.2,width,-speed,0))
        }
    }
    else{
        console.log("How'd that happen?")
    }
}


// Like swordRain, but each sword has individual speed
function funkyRain(count:number = Math.random()*4+5,speed:number= Math.random()/100+.005) {

    let side = Math.floor(Math.random()*3);

    let width = .3/count;
    if (side===0){
        //Commented out versions do funky stuff, might be cool but not what was intended here specifically
        // Nvm I quite like the funky stuff
        for (let i=0;i<count-1;i++){
            
            actorList.addActor(new Sword((i+Math.random()*.5+.25)/count,-1,width,.2,0,Math.random()/100+.005))
            //actorList.addActor(new Sword((i+Math.random()*.5+.25)/count,-1,width,.2,0,speed))
        }
    }
    else if (side===1){
        for (let i=0;i<count-1;i++){
            
            
             actorList.addActor(new Sword(-1,(i+Math.random()*.5+.25)/count,.2,width,Math.random()/100+.005,0))
            //actorList.addActor(new Sword(-1,(i+Math.random()*.5+.25)/count,.2,width,speed,0))
        }
    }
    else if (side===2){
        for (let i=0;i<count-1;i++){
            
             actorList.addActor(new Sword(2,(i+Math.random()*.5+.25)/count,.2,width,-(Math.random()/100+.005),0))
            //actorList.addActor(new Sword(2,(i+Math.random()*.5+.25)/count,.2,width,-speed,0))
        }
    }
}


// Summons hurt 
function pealBall(x:number,y:number,z:number,d=0) {
    actorList.addActor( new Rock(x,y,z,d))
}



function readattack(curFrame22:number){

    let order = orders[curFrame22];
    let border = order.split(" ");
    console.log(curFrame,curFrame22,border[0])
    while(Number(border[0]) == curFrame){
        curFrame2++;
        if (border[1]==="win"){
            isWinning = 1;
        }
        else if (border[1] ==="a"){
            switch (border[2]) {
                case "1":
                    let ang = -10;
                    let x = "random"
                    let y = "random"
                    let c = 0;
                    let c2 = 1;
                    let decay = 100
                    if (border[5]=="1"){
                        ang = "two"

                    }
                    if (border[5]=="2"){
                        y = -.5
                        decay = 50

                    }
                    attacks[Number(border[3])] = setInterval(function(){
                        let inpx = x;
                        let inpy = y;
                        c++;
                        c++;
                        if (c>=20){
                            c=0
                            c2 = 0-c2;
                        }

                        let inpang = ang;
                        if (inpang =="two"){
                            inpx = .5 + c2
                            if (c2<0){
                                inpy = (2 - c/10)-.5;
                            }
                            else{
                                inpy = (c/10)-.5;
                            }
                            let xdif = player.x-inpx;
                            let ydif = player.y-inpy;
                            if (xdif<=0 && ydif<=0){
                                inpang =   Math.PI/2-Math.acos(Math.abs(player.y-inpy)/Math.sqrt((player.y-inpy)**2+(player.x-inpx)**2));
                            }
                            else if (xdif>=0 && ydif<=0){
                                inpang =   Math.PI/2+Math.acos(Math.abs(player.y-inpy)/Math.sqrt((player.y-inpy)**2+(player.x-inpx)**2));
                            }
                            else if (xdif<=0 && ydif>=0){
                                inpang =   -Math.PI/2+Math.acos(Math.abs(player.y-inpy)/Math.sqrt((player.y-inpy)**2+(player.x-inpx)**2));
                            }
                            else{
                                inpang =   -Math.PI/2-Math.acos(Math.abs(player.y-inpy)/Math.sqrt((player.y-inpy)**2+(player.x-inpx)**2));
                            
                            }
                            // if (inpx>0){
                            //     inpang = Math.PI+Math.acos(Math.abs(player.y-inpy)/Math.sqrt((player.y-inpy)**2+(player.x-inpx)**2))
                                
                            // }
                            // else{
                            //     inpang = Math.PI-Math.asin(Math.abs(player.y-inpy)/Math.sqrt((player.y-inpy)**2+(player.x-inpx)**2))
                            // }

                        }
                        if (inpx=="random"){
                            inpx = Math.random()
                        }
                        if (inpy=="random"){
                            inpy = Math.random()
                        }
                        pealBall(inpx,inpy,inpang,decay)
                    },Number(border[4]));
                    
                    break;
                case "2":
                    let side = 0;
                    let count = 5;
                   
                    if (border[5]){
                        count = Number(border[5])
                    }
                    let spot = Math.floor(Math.random()*count);
                    if (border[6]){
                        spot = Number(border[6])
                    }
                    if (border[7]){
                        side = Number(border[7])
                    }
                    let delay = 500;
                    attacks[Number(border[3])] = setInterval(function(){
                        // spot++;
                        // if (spot >=count-1){
                        //     spot %= count-1;
                        //     side++;
                        //     side%=4;
                        // }
                        slamWarning(side,count,spot,delay)
                        setTimeout(function(){if (playing && gameState ==0){slam(side,count,spot);}},delay)
                    },Number(border[4]));
                    break;
                case "3":
                    let order = [12,11,7,13,17,6,8,18,16,0,4,24,20,10,2,14,22,5,1,3,9,19,23,21,15,5]
                    let metspot = -1;
                    let metcount = 5
                    console.log('test')
                    attacks[Number(border[3])] = setInterval(function(){
                        // spot++;
                        // if (spot >=count-1){
                        //     spot %= count-1;
                        //     side++;
                        //     side%=4;
                        // }
                        metspot++;
                        if (metspot >=order.length){
                            metspot %= order.length
                        }
                        mettaton(metcount,order[metspot]%metcount,Math.floor(order[metspot]/metcount));
                    },Number(border[4]));
                    break;
                case "4":
                    if (border[5]=="1"){
                    attacks[Number(border[3])] = setInterval(function(){
                        // spot++;
                        // if (spot >=count-1){
                        //     spot %= count-1;
                        //     side++;
                        //     side%=4;
                        // }
                       bombs();
                    },Number(border[4]));
                    }
                    else{
                        attacks[Number(border[3])] = setInterval(function(){
                            // spot++;
                            // if (spot >=count-1){
                            //     spot %= count-1;
                            //     side++;
                            //     side%=4;
                            // }
                           bombz();
                        },Number(border[4]));
                    }
                    break;
                case "5":
                    let si = 1
                    let coun = 6
                    if (border[5]){
                        coun = Number(border[5])
                    }
                    attacks[Number(border[3])] = setInterval(function(){
                        // spot++;
                        // if (spot >=count-1){
                        //     spot %= count-1;
                        //     side++;
                        //     side%=4;
                        // }
                        si = 3-si
                       swordRain(coun,1/100,si);
                    },Number(border[4]));
                default:
                    break;
            }
        }
        else if (border[1] ==="b"){
            // console.log(border)
            // console.log(attacks[Number(border[2])]);
            clearInterval(attacks[Number(border[2])]);
        }
        order = orders[curFrame2];
     border = order.split(" ");
    }
   
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
window.addEventListener('load', () => {
    if (isMobile){
      resize();

      document.addEventListener('touchstart', startDrawing);
      document.addEventListener('touchend', stopDrawing);
      document.addEventListener('touchcancel', stopDrawing);
      document.addEventListener('touchmove', Draw);
      window.addEventListener('resize', resize);}

      
  });




  var hwidth, hheight, hradius, hx_orig, hy_orig;
  function resize() {
      hwidth = window.innerWidth;
      hradius = size/6;
      hheight = hradius * 6.5;
      background();
      joystick(shiftX/3, shiftY+5*size/6);
  }

  function background() {
      hx_orig = shiftX/3;
      hy_orig = shiftY+5*size/6;

      ctx.beginPath();
      ctx.arc(hx_orig, hy_orig, size/6, 0, Math.PI * 2, true);
      ctx.fillStyle = '#ECE5E5';
      ctx.fill();
  }

  function joystick(hhwidth, hhheight) {
      ctx.beginPath();
      ctx.arc(hhwidth, hhheight, size/6, 0, Math.PI * 2, true);
      ctx.fillStyle = '#F08080';
      ctx.fill();
      ctx.strokeStyle = '#F6ABAB';
      ctx.lineWidth = 8;
      ctx.stroke();
  }

  let coord = { x: 0, y: 0 };
  let paint = false;

  function getPosition(event) {
      var mouse_x = event.clientX || event.touches[0].clientX;
      var mouse_y = event.clientY || event.touches[0].clientY;
      coord.x = mouse_x - canvas.offsetLeft;
      coord.y = mouse_y - canvas.offsetTop;
  }

  function is_it_in_the_circle() {
      var current_radius = Math.sqrt(Math.pow(coord.x - hx_orig, 2) + Math.pow(coord.y - hy_orig, 2));
      if (size/6 >= current_radius) return true
      else return false
  }
  

  function startDrawing(event) {
      paint = true;
      getPosition(event);
      if (is_it_in_the_circle()) {
         // ctx.clearRect(0, 0, canvas.width, canvas.height);
          background();
          joystick(coord.x, coord.y);
          Draw(event);
      }
  }


  function stopDrawing() {
      paint = false;
      ctx.clearRect(0, 0, canvas.width/4, canvas.height);
      background();
      joystick(shiftX/3, shiftY+5*size/6);
      player.yVelocity = 0
      player.xVelocity = 0


  }

  function Draw(event) {
      getPosition(event);
      if (paint) {
          //ctx.clearRect(0, 0, canvas.width, canvas.height);
          background();
          var angle_in_degrees,x, y, speed;
          var angle = Math.atan2((coord.y - hy_orig), (coord.x - hx_orig));

          if (Math.sign(angle) == -1) {
              angle_in_degrees = Math.round(-angle * 180 / Math.PI);
          }
          else {
              angle_in_degrees =Math.round( 360 - angle * 180 / Math.PI);
          }


          if (is_it_in_the_circle()) {
              joystick(coord.x, coord.y);
              x = coord.x;
              y = coord.y;
          }
          else {
              x = size/6 * Math.cos(angle) + hx_orig;
              y = size/6 * Math.sin(angle) + hy_orig;
              joystick(x, y);
          }

      
          getPosition(event);
          player.yVelocity = 7 * Math.sin(angle)/500
          player.xVelocity = 7 * Math.cos(angle)/500
      }
  } 