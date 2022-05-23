
// Basic setting audio up
let canvas = document.getElementById("audio_visual");
let ctx = canvas.getContext("2d");
let audioElement = document.getElementById("source");
let audioCtx = new AudioContext();
let analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
let source = audioCtx.createMediaElementSource(audioElement);
source.connect(analyser); 
source.connect(audioCtx.destination);
let data = new Uint8Array(analyser.frequencyBinCount);
requestAnimationFrame(loopingFunction);
analyser.getByteFrequencyData(data); 


function loopingFunction(){
    requestAnimationFrame(loopingFunction);
    analyser.getByteFrequencyData(data);
    draw(data);
}
let k = 21*15;
var arr = Array.from(Array(300), () => new Array(25));
for (let pi=0;pi<300;pi++){
    for (let di=0;di<25;di++){
        arr[pi][di] = 0;
    }
}
function draw(data){
    data = [...data];
    k++;
    console.log(arr[90][27]);
    console.log(data);
    //console.log(5*Math.floor(k/15))
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let space = canvas.width / data.length;
    data.forEach((value,i)=>{
        ctx.beginPath();
        if (true){
        ctx.moveTo(space*i,canvas.height); //x,y
        ctx.lineTo(space*i,canvas.height-value); //x,y"
        ctx.moveTo(space*(5*Math.floor(k/15)),canvas.height); //x,y
        ctx.lineTo(space*(5*Math.floor(k/15)),canvas.height-100); //x,y"
        }
        ctx.stroke();
    })
}

audioElement.onplay = ()=>{
    
    audioCtx.resume();
}

document.addEventListener("keydown", function(event){
    //Handle keydown events
    //Get the key that was pressed: event.key
    if (event.key===" "){
        audioElement.play();
    }

});
