// Some standard user-input events. Define handling of these events here.


// for easy changing of arrow keys <--> WASD
const upKey = "w"
const leftKey = "a"
const downKey = "s"
const rightKey = "d"

let circles = 1;
// Didn't want a down down variable, so I stuck with the letters
let wDown = 0;
let aDown = 0;
let sDown = 0;
let dDown = 0;
let player : Player = new Player(.5,.5);; 


window.addEventListener("load", function() {
    //Handle when the whole page finishes loading
    //Use this to "set up" the initial state of things;

    //Often, this includes populating the actorList.
    // A sample:
        
    actorList.addActor(player);

 

})

canvas.addEventListener("click", function(event: MouseEvent) {
    //Handle click events
    //Get position of click on canvas: event.offsetX, event.offsetY
});

document.addEventListener("keydown", function(event: KeyboardEvent){
    if (event.key==="p"){
        circles++;
        circles%=4;
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
        pealBall();
        //patternCircles(0,sign);
    }
}, 150)


// Changes the attack every 5 secs
setInterval(function() {
    circles++;
    circles%=5;
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
        let count = 5;
        let spot = Math.floor(Math.random()*count)
        let delay = 1000;
        slamWarning(side,count,spot,delay)
        setTimeout(function(){slam(side,count,spot);},delay)
    }
}, 500)


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


// Pattern circles accepts a function which dictates x -> y
function patternCircles(lead:number,f:Function) {
    actorList.addActor( new PatternRock(lead,f));
};
function sign(x:number){
    let spot = Math.sin(x*3*Math.PI)
    return (spot+1)/2
}

// Creates expanding squares in a random spot
//function mettaton(){
//    let count = 5;
//    let hex = Math.floor(Math.random()*count)
//    let hi = Math.floor(Math.random()*count)
//    actorList.addActor(new expandingSquare((hex+.5)/count,(hi+.5)/count,.01,1/count,50));
//}

function mettaton(){
    let count = 5;
    let hex = Math.floor(Math.random()*count)
    let hi = Math.floor(Math.random()*count)
    actorList.addActor(new diamondSquare((hex+.5)/count,(hi+.5)/count,.01,1/count,50));
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
function swordRain(count:number = Math.random()*4+5,speed:number= Math.random()/500+.009) {

    let side = Math.floor(Math.random()*3);

    let width = (.3*6)/(count**2);
  
    if (side===0){
        //Commented out versions do funky stuff, might be cool but not what was intended here specifically
        for (let i=0;i<count;i++){
            
            // actorList.addActor(new Sword((i+Math.random()*.5+.25)/count,-1,width,.2,0,Math.random()/100+.005))
            actorList.addActor(new Sword((i+Math.random()*.5+.25)/(count+.5),-.2,width,.2,0,speed))
        }
    }
    else if (side===1){
        for (let i=0;i<count;i++){
            
            
            // actorList.addActor(new Sword(-1,(i+Math.random()*.5+.25)/count,.2,width,Math.random()/100+.005,0))
            actorList.addActor(new Sword(-.2,(i+Math.random()*.5+.25)/(count+.5),.2,width,speed,0))
        }
    }
    else if (side===2){
        for (let i=0;i<count;i++){
            
            // actorList.addActor(new Sword(2,(i+Math.random()*.5+.25)/count,.2,width,-(Math.random()/100+.005),0))
            actorList.addActor(new Sword(1.2,(i+Math.random()*.5+.25)/(count+.5),.2,width,-speed,0))
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
function pealBall() {
    actorList.addActor( new Rock(Math.random()))
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