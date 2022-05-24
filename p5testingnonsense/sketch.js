let sound, amplitude, x=0;

function preload(){
  sound = loadSound('../audio/ASGORE.mp3');
}
function setup() {
  let cnv = createCanvas(1000,1000);
  cnv.mouseClicked(togglePlay);
  amplitude = new p5.Amplitude();
}

function draw() {
 
  text('tap to play', 20, 20);

  let level = amplitude.getLevel();
  let size = map(level, 0, 1, 0, 200*10);
  let y = map(level, 0, 1, 0, height);
  rect(x, height-y, 1,y);
  x++;
  if (x > 1000){
    background(220);
    x=0;
  }
  console.log(level);
}

function togglePlay() {
  if (sound.isPlaying() ){
    sound.pause();
  } else {
    sound.loop();
		amplitude = new p5.Amplitude();
		amplitude.setInput(sound);
  }
}