var file ='../audio/SANS.mp3'
var sound;
var gtpth;

function preload() {
    sound = loadSound(file);
}

function setup() {
    sound.play();
    gtpth = sound.getPeaks();
    console.log(gtpth);
}


function play(){
    if(playing){
        source_file.pause();
    //    button.html('play');
        playing = false;
    }
    else{
        source_file.play();
    //    button.html('pause');
        playing = true;
    }
}

function keyTyped(){
    if (key == ' '){
        play();
    }
    return false; // callback for p5js
}
