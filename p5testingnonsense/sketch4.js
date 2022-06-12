/**
 *  p5.PeakDetect listens for peaks at a specific part of the
 *  frequency spectrum.
 *
 *  In this example, we listen for the shaker.
 *
 *  For more, see: http://p5js.org/reference/#/p5.PeakDetect
 */

 var cnv, soundFile, fft, peakDetect;
 var ellipseWidthfirst = 10;
 var ellipseWidthsecond = 10;
 var ellipseWidththird = 10;
 var ellipseWidthfourth = 10;
 var ellipseWidthfifth = 10;
 var ellipseWidthsixth = 10;
 var counter1 = 0;
 var counter2 = 0;
 var counter3 = 0;
 var counter4 = 0;
 var counter5 = 0;
 var counter6 = 0;
 var counter7 = 0;
 var counter8 = 0;
 var counter9 = 0;
 var counter10 = 0;
 var counter11 = 0;
 var counter12 = 0;
 var counter13 = 0;
 var counter14 = 0;
 var counter15 = 0;
 var counter16 = 0;
 var counter17 = 0;
 var counter18 = 0;
 var counter19 = 0;
 var counter20 = 0;
 var counter21 = 0;

 var counter = 0;
 
 function setup() {
   background(0);
   createCanvas(windowWidth, windowHeight);
   noStroke();
   fill(255);
   textAlign(CENTER);
 
   soundFile = loadSound('../audio/MUFFET.mp3');
   // UNDYNE [269, 268, 265, 263, 263, 262, 261, 261, 261, 260, 261, 258, 255, 256, 248, 235, 225, 222, 188, 33, 0]
   // ASGORE [331, 327, 328, 323, 322, 318, 320, 318, 320, 314, 304, 297, 277, 249, 234, 202, 184, 165, 119, 9, 0]
   // SANS [549, 556, 548, 553, 557, 556, 559, 561, 562, 556, 559, 555, 558, 562, 558, 561, 562, 559, 557, 0, 0]
   // MUFFET [301, 297, 297, 293, 294, 293, 295, 297, 295, 290, 289, 272, 263, 262, 226, 217, 189, 147, 98, 6, 0]

   // megalovania as piano test pls ok ty
   // p5.PeakDetect requires a p5.FFT
   fft = new p5.FFT();
 
   peakDetect1 = new p5.PeakDetect(0, 100, 0.2);
   peakDetect2 = new p5.PeakDetect(100, 200, 0.2);
   peakDetect3 = new p5.PeakDetect(200, 400, 0.2);
   peakDetect4 = new p5.PeakDetect(400, 1000, 0.2);
   peakDetect5 = new p5.PeakDetect(1000, 1500, 0.2);
   peakDetect6 = new p5.PeakDetect(1500, 2000, 0.2);
   peakDetect7 = new p5.PeakDetect(2000, 2500, 0.2);
   peakDetect8 = new p5.PeakDetect(2500, 3000, 0.2);
   peakDetect9 = new p5.PeakDetect(3000, 3500, 0.2);
   peakDetect10 = new p5.PeakDetect(3500, 4000, 0.2);
   peakDetect11 = new p5.PeakDetect(4000, 4500, 0.2);
   peakDetect12 = new p5.PeakDetect(4500, 5000, 0.2);
   peakDetect13 = new p5.PeakDetect(5000, 5500, 0.2);
   peakDetect14 = new p5.PeakDetect(5500, 6000, 0.2);
   peakDetect15 = new p5.PeakDetect(6000, 6500, 0.2);
   peakDetect16 = new p5.PeakDetect(6500, 7000, 0.2);
   peakDetect17 = new p5.PeakDetect(7000, 7500, 0.2);
   peakDetect18 = new p5.PeakDetect(7500, 8000, 0.2);
   peakDetect19 = new p5.PeakDetect(8000, 10000, 0.2);
   peakDetect20 = new p5.PeakDetect(10000, 15000, 0.2);
   peakDetect21 = new p5.PeakDetect(15000, 20000, 0.2);

   peakDetectfirst = new p5.PeakDetect(0, 1000, 0.2);
   peakDetectsecond = new p5.PeakDetect(1000, 2000, 0.2);
   peakDetectthird = new p5.PeakDetect(2000, 3000, 0.2);
   peakDetectfourth = new p5.PeakDetect(3000, 5000, 0.2);
   peakDetectfifth = new p5.PeakDetect(5000, 8000, 0.2);
   peakDetectsixth = new p5.PeakDetect(8000, 15000, 0.2);
 
 }
 
 function draw() {
    counter += 1;
    console.log(counter);

    fft.analyze();
    peakDetect1.update(fft);
    if (peakDetect1.isDetected){
        counter1 += 1;
    }
    fft.analyze();
    peakDetect2.update(fft);
    if (peakDetect2.isDetected){
        counter2 += 1;
    }
    fft.analyze();
    peakDetect3.update(fft);
    if (peakDetect3.isDetected){
        counter3 += 1;
    }
    fft.analyze();
    peakDetect4.update(fft);
    if (peakDetect4.isDetected){
        counter4 += 1;
    }
    fft.analyze();
    peakDetect5.update(fft);
    if (peakDetect5.isDetected){
        counter5 += 1;
    }
    fft.analyze();
    peakDetect6.update(fft);
    if (peakDetect6.isDetected){
        counter6 += 1;
    }
    fft.analyze();
    peakDetect7.update(fft);
    if (peakDetect7.isDetected){
        counter7 += 1;
    }
    fft.analyze();
    peakDetect8.update(fft);
    if (peakDetect8.isDetected){
        counter8 += 1;
    }
    fft.analyze();
    peakDetect9.update(fft);
    if (peakDetect9.isDetected){
        counter9 += 1;
    }
    fft.analyze();
    peakDetect10.update(fft);
    if (peakDetect10.isDetected){
        counter10 += 1;
    }
    fft.analyze();
    peakDetect11.update(fft);
    if (peakDetect11.isDetected){
        counter11 += 1;
    }
    fft.analyze();
    peakDetect12.update(fft);
    if (peakDetect12.isDetected){
        counter12 += 1;
    }
    fft.analyze();
    peakDetect13.update(fft);
    if (peakDetect13.isDetected){
        counter13 += 1;
    }
    fft.analyze();
    peakDetect14.update(fft);
    if (peakDetect14.isDetected){
        counter14 += 1;
    }
    fft.analyze();
    peakDetect15.update(fft);
    if (peakDetect15.isDetected){
        counter15 += 1;
    }
    fft.analyze();
    peakDetect16.update(fft);
    if (peakDetect16.isDetected){
        counter16 += 1;
    }
    fft.analyze();
    peakDetect17.update(fft);
    if (peakDetect17.isDetected){
        counter17 += 1;
    }
    fft.analyze();
    peakDetect18.update(fft);
    if (peakDetect18.isDetected){
        counter18 += 1;
    }
    fft.analyze();
    peakDetect19.update(fft);
    if (peakDetect19.isDetected){
        counter19 += 1;
    }
    fft.analyze();
    peakDetect20.update(fft);
    if (peakDetect20.isDetected){
        counter20 += 1;
    }
    fft.analyze();
    peakDetect21.update(fft);
    if (peakDetect21.isDetected){
        counter21 += 1;
    }


    
   background(0);
 
   // peakDetect accepts an fft post-analysis
   // 1
   fft.analyze();
   peakDetectfirst.update(fft);
 
   if ( peakDetectfirst.isDetected) {
     ellipseWidthfirst = 300;
   } else {
     ellipseWidthfirst *= 0.95;
   }
 
   ellipse(width/2 - 500, height/2 - 150, ellipseWidthfirst, ellipseWidthfirst);

   // 2
   fft.analyze();
   peakDetectsecond.update(fft);
 
   if ( peakDetectsecond.isDetected) {
     ellipseWidthsecond = 300;
   } else {
     ellipseWidthsecond *= 0.95;
   }
 
   ellipse(width/2, height/2 - 150, ellipseWidthsecond, ellipseWidthsecond);

   // 3
   fft.analyze();
   peakDetectthird.update(fft);
 
   if ( peakDetectthird.isDetected) {
     ellipseWidththird = 300;
   } else {
     ellipseWidththird *= 0.95;
   }
 
   ellipse(width/2 + 500, height/2 - 150, ellipseWidththird, ellipseWidththird);


   // 4
   fft.analyze();
   peakDetectfourth.update(fft);
 
   if ( peakDetectfourth.isDetected) {
     ellipseWidthfourth = 300;
   } else {
     ellipseWidthfourth *= 0.95;
   }
 
   ellipse(width/2 - 500, height/2 + 150, ellipseWidthfourth, ellipseWidthfourth);

   // 5
   fft.analyze();
   peakDetectfifth.update(fft);
 
   if ( peakDetectfifth.isDetected) {
     ellipseWidthfifth = 300;
   } else {
     ellipseWidthfifth *= 0.95;
   }
 
   ellipse(width/2, height/2 + 150, ellipseWidthfifth, ellipseWidthfifth);

   // 6
   fft.analyze();
   peakDetectsixth.update(fft);
 
   if ( peakDetectsixth.isDetected) {
     ellipseWidthsixth = 300;
   } else {
     ellipseWidthsixth *= 0.95;
   }
 
   ellipse(width/2 + 500, height/2 + 150, ellipseWidthsixth, ellipseWidthsixth);
   console.log([counter1, counter2, counter3, counter4, counter5, counter6, counter7, counter8, counter9, counter10, counter11, counter12, counter13, counter14, counter15, counter16, counter17, counter18, counter19, counter20, counter21]);

 }
 
 // toggle play/stop when canvas is clicked
 function mouseClicked() {
   if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
     if (soundFile.isPlaying() ) {
       soundFile.stop();
     } else {
       soundFile.play();
     }
   }
 }