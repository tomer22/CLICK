"use strict";
function rc() {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${.5})`;
}
let tLength = 7;
var positions = [];
function storeLastPosition(xPos, yPos) {
    positions.push({
        x: xPos,
        y: yPos
    });
    if (positions.length > tLength) {
        positions.shift();
    }
}
// Define the properties/ behavior of Actor 
class Actor {
    constructor(x, y) {
        //set up properties
        this.x = x;
        this.y = y;
    }
    /**
     * Draw the actor on the canvas.
     */
    draw() {
        // Use ctx to draw. A sample (drawing a small circle):
    }
    /**
     * Update this actor for the next frame.
     */
    update() {
        // Update properties or other Actors in the actorList.
    }
}
// Recommended: Create sub-classes of Actor:
// class SubActor extends Actor { ... }
class Player extends Actor {
    //override
    constructor(x, y) {
        super(x, y);
        this.iFrames = 0;
        this.iTime = 60;
        this.color = "#1451e0";
        this.iColor = "#587acc";
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.r = 1 / 30;
    }
    moveLeft() {
        this.xVelocity = -5 / (500);
    }
    moveRight() {
        this.xVelocity = 5 / (500);
    }
    moveUp() {
        this.yVelocity = -5 / (500);
    }
    moveDown() {
        this.yVelocity = 5 / (500);
    }
    draw() {
        //ctx.fillStyle = "blue";
        if (!isDead) { //ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
            for (var i = 0; i < positions.length; i++) {
                let ratio = (i + 1) / positions.length;
                ctx.fillStyle = "rgba(70, 121, 240, " + ratio / 2 + ")";
                ctx.beginPath();
                ctx.arc(shiftX + positions[i].x * size, shiftY + positions[i].y * size, ratio * this.r * size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            ctx.fillStyle = this.color;
            if (this.iFrames) {
                this.iFrames--;
                if (Math.floor(this.iFrames / 5) % 2) {
                    ctx.fillStyle = this.iColor;
                }
            }
            ctx.beginPath();
            ctx.arc(shiftX + this.x * size, shiftY + this.y * size, this.r * size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        //console.log(this.x,this.y)
    }
    update() {
        this.x += this.xVelocity * 1.3;
        this.y += this.yVelocity * 1.3;
        // Tampering with collision to make it look nicer
        let wallShift = this.r;
        if (this.x > 1 - wallShift) {
            this.x = 1 - wallShift;
        }
        if (this.x < wallShift) {
            this.x = wallShift;
        }
        if (this.y > 1 - wallShift) {
            this.y = 1 - wallShift;
        }
        if (this.y < wallShift) {
            this.y = wallShift;
        }
        storeLastPosition(this.x, this.y);
    }
    // When player is hit, if it is has not been recently hit, take damage
    onhit() {
        if (!this.iFrames) {
            pHth--;
            if (pHth <= 0) {
                this.ondeath();
            }
            if (pHth < 0) {
                pHth = 0;
            }
            this.iFrames = this.iTime;
        }
    }
    ondeath() {
        isDead = 1;
        actorList.removeActor(this);
        setTimeout(function () {
            isDying = 1;
        }, 500);
        let bount = 5;
        boomsound.load();
        boomsound.play();
        for (let i = 0; i < bount; i++) {
            actorList.addActor(new SharpRock(this.x, this.y, -Math.PI / 2 + i * 2 * Math.PI / bount, this.color, this.r / (bount ** (1 / 4))));
        }
    }
    onheal() {
        pHth++;
        if (pHth > mxHth) {
            pHth = mxHth;
        }
    }
}
class FallingCircle extends Actor {
    //override Actor's constructor
    constructor(x, y, color, decay = 0) {
        super(x, y); // calls the Actor's constructor
        this.color = color;
        this.r = 1 / 30;
        this.decay = decay;
        // Lots of math, basically just generates circles in a ring around the center,
        // staggered a bit so they don't all converge at one point
        this.ang = Math.random() * 2 * Math.PI;
        this.y = .5 + (.5 - y) * Math.sin(this.ang) + x * Math.cos(this.ang) / 2;
        this.x = .5 + (.5 - y) * Math.cos(this.ang) + x * Math.sin(this.ang) / 2;
        //this.speed = Math.random()/100+.005;
        this.speed = 1 / 100;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(shiftX + this.x * size, shiftY + this.y * size, size * this.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        // Angular movement
        //console.log(this.ang)
        this.y -= this.speed * Math.sin(this.ang);
        this.x -= this.speed * Math.cos(this.ang);
        if ((this.y - .5) ** 2 + (this.x - .5) ** 2 > 3) {
            actorList.removeActor(this);
        }
        let inpx = this.x;
        let inpy = this.y;
        let inpang = this.ang;
        this.ang = inpang;
        let xdif = player.x - inpx;
        let ydif = player.y - inpy;
        if (xdif < 0 && ydif < 0) {
            inpang = Math.PI / 2 - Math.acos(Math.abs(player.y - inpy) / Math.sqrt((player.y - inpy) ** 2 + (player.x - inpx) ** 2));
        }
        else if (xdif > 0 && ydif < 0) {
            inpang = Math.PI / 2 + Math.acos(Math.abs(player.y - inpy) / Math.sqrt((player.y - inpy) ** 2 + (player.x - inpx) ** 2));
        }
        else if (xdif < 0 && ydif > 0) {
            inpang = -Math.PI / 2 + Math.acos(Math.abs(player.y - inpy) / Math.sqrt((player.y - inpy) ** 2 + (player.x - inpx) ** 2));
        }
        else if (xdif > 0 && ydif > 0) {
            inpang = -Math.PI / 2 - Math.acos(Math.abs(player.y - inpy) / Math.sqrt((player.y - inpy) ** 2 + (player.x - inpx) ** 2));
        }
        this.decay--;
        if (this.decay >= 0) {
            this.ang = inpang;
            // ==this.ang += (inpang-this.ang)/3
        }
    }
}
class Rock extends FallingCircle {
    //overrides FallingCircle constructor
    constructor(x, y = -.5, ang = -10, decay = 0) {
        super(x, y, "red", decay);
        if (ang !== -10) {
            this.ang = ang;
            this.x = x;
            this.y = y;
        }
    }
    //override
    update() {
        super.update();
        //console.log(this.x,this.y)
        //check collision with player
        if ((this.x - player.x) ** 2 + (this.y - player.y) ** 2 < (this.r + player.r) ** 2) {
            //window.alert("You died from a rock!");
            player.onhit();
            //actorList.removeActor(this);
        }
    }
}
class SharpRock extends Rock {
    constructor(x, y, angle, color = "red", r = "die") {
        super(x, y); // calls the Actor's constructor
        // Lots of math, basically just generates circles in a ring around the center,
        // staggered a bit so they don't all converge at one point
        if (r != "die") {
            this.r = r;
        }
        this.color = color;
        this.ang = angle;
        this.y = y;
        this.x = x;
        this.speed = 1 / 100;
    }
}
// Rocks which follow a pattern
class PatternRock extends Rock {
    constructor(lead = 0, f, dir = 1, x = 0, y = -.5) {
        super(x, y);
        this.lead = lead;
        this.f = f;
        this.dir = dir;
        this.speed = this.dir / 100;
        // Generate from one of 4 sides
        if (this.lead === 0 && this.speed > 0) {
            this.x = -.5;
        }
        else if (this.lead === 0 && this.speed < 0) {
            this.x = 1.5;
        }
        else if (this.lead === 1 && this.speed > 0) {
            this.y = -.5;
        }
        else if (this.lead === 1 && this.speed < 0) {
            this.y = 1.5;
        }
    }
    //override
    update() {
        // Either x -> y or y-> x
        if (this.lead == 0) {
            this.x += this.speed;
            this.y = this.f(this.x);
        }
        if (this.lead == 1) {
            this.y += this.speed;
            this.x = this.f(this.y);
        }
        if ((this.y - .5) ** 2 + (this.x - .5) ** 2 > 3) {
            actorList.removeActor(this);
        }
        //check collision with player
        if ((this.x - player.x) ** 2 + (this.y - player.y) ** 2 < (this.r + player.r) ** 2) {
            //window.alert("You died from a rock!");
            player.onhit();
            //actorList.removeActor(this);
        }
    }
}
class Fruit extends FallingCircle {
    constructor(x, y = -.5) {
        super(x, y, "green");
    }
    //override
    update() {
        super.update();
        //check collision with player
        if ((this.x - player.x) ** 2 + (this.y - player.y) ** 2 < (this.r + player.r) ** 2) {
            actorList.removeActor(this);
            player.onheal();
        }
    }
}
class Bomb extends Rock {
    constructor(x, y, decay) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.decay = decay;
        this.stDecay = decay;
        this.color = `rgba(255,0,0,${1 - this.decay / this.stDecay})`;
        // this.boomColor = "#eb7f86"
        this.nextBeep = Math.floor(decay / 10);
        this.r *= 1.5;
        this.speed = 0;
    }
    update() {
        this.decay--;
        this.nextBeep--;
        this.color = `rgba(255,0,0,${1 - this.decay / this.stDecay})`;
        if (this.decay / this.stDecay <= .5) {
            if ((this.x - player.x) ** 2 + (this.y - player.y) ** 2 < (this.r + player.r) ** 2) {
                //window.alert("You died from a rock!");
                player.onhit();
                //actorList.removeActor(this);
            }
        }
        // if (this.nextBeep <=Math.min(5,this.decay/20) ){
        //     this.nextBeep = Math.floor(this.decay/10)
        //     this.color = "#eb7f86"
        // }
        // else{
        //     this.color = "red";
        // }
        if (this.decay <= 50) {
            this.onBoom();
            //console.log(this.x,this.y)
            actorList.removeActor(this);
        }
    }
    onBoom() {
    }
}
class LaserBomb extends Bomb {
    constructor(x, y, decay, delay = 20) {
        super(x, y, decay);
        this.delay = delay;
    }
    draw() {
        super.draw();
        let s1 = this.r;
        let s2 = this.r / 4;
        ctx.fillStyle = "#252525";
        ctx.fillRect(shiftX + this.x * size - s1 * size / 2, shiftY + this.y * size - s2 * size / 2, s1 * size, s2 * size);
        ctx.fillRect(shiftX + this.x * size - s2 * size / 2, shiftY + this.y * size - s1 * size / 2, s2 * size, s1 * size);
    }
    onBoom() {
        actorList.addActor(new Laser(.5, this.y, 1, 2 * this.r, this.delay));
        console.log(this.delay);
        actorList.addActor(new Laser(this.x, .5, 2 * this.r, 1, this.delay));
    }
}
class CircleBomb extends Bomb {
    constructor(x, y, decay, count = Math.floor(Math.random() * 6) + 3) {
        super(x, y, decay);
        this.count = count;
    }
    draw() {
        super.draw();
        let sr = this.r / this.count;
        ctx.fillStyle = "#252525";
        for (let i = 0; i < this.count; i++) {
            ctx.beginPath();
            ctx.arc(shiftX + this.x * size + size * this.r * (Math.sin(i * 2 * Math.PI / this.count)) / 2, shiftY + this.y * size + size * this.r * (Math.cos(i * 2 * Math.PI / this.count)) / 2, size * sr, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
    onBoom() {
        for (let i = 0; i < this.count; i++) {
            actorList.addActor(new SharpRock(this.x, this.y, -Math.PI / 2 + i * 2 * Math.PI / this.count));
        }
    }
    pattern() {
    }
}
// Basic rectangle actor (as the name suggests)
class RectangleActor extends Actor {
    constructor(x, y, w, h) {
        super(x, y);
        this.color = "red";
        this.w = w;
        this.h = h;
    }
    draw() {
        // Rectangles x and y determine its center
        ctx.fillStyle = this.color;
        ctx.fillRect(shiftX + this.x * size - this.w * size / 2, shiftY + this.y * size - this.h * size / 2, this.w * size, this.h * size);
    }
    update() {
    }
    checkCol() {
        // Nice circle rectangle collision algorithm I found from StackOverflow
        let distX = Math.abs(player.x - this.x);
        let distY = Math.abs(player.y - this.y);
        if (distX > (Math.abs(this.w) / 2 + player.r)) {
            return false;
        }
        if (distY > (Math.abs(this.h) / 2 + player.r)) {
            return false;
        }
        if (distX <= (Math.abs(this.w) / 2)) {
            return true;
        }
        if (distY <= (Math.abs(this.h) / 2)) {
            return true;
        }
        let crnrDist = (player.x - Math.abs(this.w) / 2) ^ 2 +
            (player.y - Math.abs(this.h) / 2) ^ 2;
        return (crnrDist <= (player.r ^ 2));
    }
}
class DecayRect extends RectangleActor {
    constructor(x, y, w, h, decay) {
        super(x, y, w, h);
        this.w = w;
        this.h = h;
        this.decay = decay;
        this.color = "#252525";
    }
    draw() {
        super.draw();
        this.decay--;
        if (this.decay <= 0) {
            actorList.removeActor(this);
        }
    }
}
// Swords, wooo. Effectively just rectangles that move
class Sword extends RectangleActor {
    constructor(x, y, w, h, xV, yV) {
        super(x, y, w, h);
        this.xV = xV;
        this.yV = yV;
    }
    update() {
        // They literally just move
        this.x += this.xV;
        this.y += this.yV;
        if (this.checkCol()) {
            player.onhit();
        }
    }
}
class Laser extends RectangleActor {
    constructor(x, y, w, h, decay) {
        super(x, y, w, h);
        this.decay = decay;
    }
    update() {
        if (this.checkCol()) {
            player.onhit();
        }
        this.decay--;
        if (this.decay <= 0) {
            actorList.removeActor(this);
        }
    }
}
// Fun one, slams out then retracts
class evilWall extends RectangleActor {
    constructor(x, y, w, h, xV, yV, freeeeeeze = 0) {
        super(x, y, w, h);
        this.xV = xV;
        this.yV = yV;
        this.state = 1;
        this.backSpeed = 1 / 2;
        this.freezee = freeeeeeze;
    }
    update() {
        // Its center moves forward but its dimensions increase to make it seem like its just stretching
        if (this.state) {
            this.x += this.xV;
            this.w += this.xV * 2;
            this.y += this.yV;
            this.h += this.yV * 2;
            // If its at its max, state = 0 and we start retraction process
            if (this.h > 1 && this.yV > 0) {
                this.h = 1;
                this.y = .5;
                this.state = 0;
            }
            if (this.h < -1 && this.yV < 0) {
                this.h = -1;
                this.y = .5;
                this.state = 0;
            }
            if (this.w > 1 && this.xV > 0) {
                this.w = 1;
                this.x = .5;
                this.state = 0;
            }
            if (this.w < -1 && this.xV < 0) {
                this.w = -1;
                this.x = .5;
                this.state = 0;
            }
        }
        else {
            if (this.freezee >= 0) {
                this.freezee--;
            }
            else {
                this.x -= this.xV * this.backSpeed;
                this.w -= this.xV * 2 * this.backSpeed;
                this.y -= this.yV * this.backSpeed;
                this.h -= this.yV * 2 * this.backSpeed;
                // If it becomes too small, delete
                if (this.h < 0 && this.yV > 0) {
                    actorList.removeActor(this);
                }
                if (this.h > 0 && this.yV < 0) {
                    actorList.removeActor(this);
                }
                if (this.w < 0 && this.xV > 0) {
                    actorList.removeActor(this);
                }
                if (this.w > 0 && this.xV < 0) {
                    actorList.removeActor(this);
                }
            }
        }
        if (this.checkCol()) {
            player.onhit();
        }
    }
}
// Squares go boom
class expandingSquare extends RectangleActor {
    constructor(x, y, growth, max, decay) {
        super(x, y, 0, 0);
        // Start as warning color
        this.color = "#943140";
        this.growth = growth;
        this.max = max;
        this.decay = decay;
    }
    update() {
        // Square grows
        if (this.w < this.max) {
            this.w += this.growth;
            this.h += this.growth;
        }
        // Square is at max
        if (this.w >= this.max) {
            // Becomes deadly
            this.color = "red";
            this.w = this.max;
            this.h = this.max;
            // Decays over time, so it eventually disappears
            this.decay--;
            if (this.decay <= 0) {
                actorList.removeActor(this);
            }
            if (this.checkCol()) {
                player.onhit();
            }
        }
    }
}
// Just a bunch stuff that was way too complicated just to draw a triangle that points a certain way and 
// disappears a bit later
class Warning extends Actor {
    constructor(x, y, b, h, dir, span) {
        super(x, y);
        this.span = span;
        this.h = h;
        this.b = b;
        this.dir = dir;
    }
    draw() {
        ctx.fillStyle = "#943140";
        ctx.beginPath();
        ctx.moveTo(shiftX + size * this.x, shiftY + size * this.y);
        if (this.dir === 0) {
            //down... I think?
            ctx.lineTo(shiftX + size * this.x + this.b * size / 2, shiftY + size * (this.y - this.h));
            ctx.lineTo(shiftX + size * this.x - this.b * size / 2, shiftY + size * (this.y - this.h));
        }
        else if (this.dir === 2) {
            ctx.lineTo(shiftX + size * (this.x + this.h), shiftY + size * this.y + this.b * size / 2);
            ctx.lineTo(shiftX + size * (this.x + this.h), shiftY + size * this.y - this.b * size / 2);
        }
        else if (this.dir === 1) {
            ctx.lineTo(shiftX + size * (this.x - this.h), shiftY + size * this.y + this.b * size / 2);
            ctx.lineTo(shiftX + size * (this.x - this.h), shiftY + size * this.y - this.b * size / 2);
        }
        else if (this.dir === 3) {
            //up
            ctx.lineTo(shiftX + size * this.x + this.b * size / 2, shiftY + size * (this.y + this.h));
            ctx.lineTo(shiftX + size * this.x - this.b * size / 2, shiftY + size * (this.y + this.h));
        }
        ctx.fill();
        this.span--;
        if (this.span <= 0) {
            actorList.removeActor(this);
        }
    }
}
//class Flower extends Actor {
class Flower extends Actor {
    constructor(x, y, r) {
        //set up properties
        super(x, y);
        this.r = r;
        this.state = Math.floor(Math.random() * 1000);
        this.color = "gray";
        this.speedX = (Math.random() * 5 + 1) * (2 * Math.floor(2 * Math.random()) - 1);
        this.speedY = (Math.random() * 5 + 1) * (2 * Math.floor(2 * Math.random()) - 1);
        this.rotate = 0;
        this.speedR = (2 * Math.floor(2 * Math.random()) - 1) * (Math.random() / 6 + .1);
    }
    draw() {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        for (let i = 0; i < 2 * Math.PI * 10; i += .1)
            ctx.arc(this.x, this.y, Math.abs(Math.cos((i + this.rotate) * 1.25) * Math.sin((i + this.rotate) * 1.25)) * this.r * 2, i, i + .1);
        ctx.stroke();
        //ctx.arc(this.x,this.y,this.r, 0 , Math.PI * 2);
        ctx.closePath();
    }
    update() {
        // Update properties or other Actors in the actorList.
        this.rotate += this.speedR;
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
