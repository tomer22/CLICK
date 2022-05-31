"use strict";
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
        this.xVelocity = -5;
    }
    moveRight() {
        this.xVelocity = 5;
    }
    moveUp() {
        this.yVelocity = -5;
    }
    moveDown() {
        this.yVelocity = 5;
    }
    draw() {
        //ctx.fillStyle = "blue";
        //ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
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
        //console.log(this.x,this.y)
    }
    update() {
        this.x += this.xVelocity / (500);
        this.y += this.yVelocity / (500);
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
    }
    onhit() {
        if (!this.iFrames) {
            pHth--;
            if (pHth <= 0) {
                window.alert("git gud");
            }
            if (pHth < 0) {
                pHth = 0;
            }
            this.iFrames = this.iTime;
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
    constructor(x, y, color) {
        super(x, y); // calls the Actor's constructor
        this.color = color;
        this.r = 1 / 30;
        this.ang = Math.random() * 2 * Math.PI;
        this.y = .5 + (.5 - y) * Math.sin(this.ang) + x * Math.cos(this.ang) / 2;
        this.x = .5 + (.5 - y) * Math.cos(this.ang) + x * Math.sin(this.ang) / 2;
        this.speed = Math.random() / 100 + .005;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(shiftX + this.x * size, shiftY + this.y * size, size * this.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        this.y -= this.speed * Math.sin(this.ang);
        this.x -= this.speed * Math.cos(this.ang);
        if ((this.y - .5) ** 2 + (this.x - .5) ** 2 > 3) {
            actorList.removeActor(this);
        }
    }
}
class Rock extends FallingCircle {
    //overrides FallingCircle constructor
    constructor(x, y = -.5) {
        super(x, y, "red");
    }
    //override
    update() {
        super.update();
        //check collision with player
        if ((this.x - player.x) ** 2 + (this.y - player.y) ** 2 < (this.r + player.r) ** 2 / 1.3) {
            //window.alert("You died from a rock!");
            player.onhit();
            //actorList.removeActor(this);
        }
    }
}
class PatternRock extends Rock {
    constructor(lead = 0, f, dir = 1, x = 0, y = -.5) {
        super(x, y);
        this.lead = lead;
        this.f = f;
        this.dir = dir;
        this.speed = this.dir / 100;
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
        if ((this.x - player.x) ** 2 + (this.y - player.y) ** 2 < (this.r + player.r) ** 2 / 1.3) {
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
        if ((this.x - player.x) ** 2 + (this.y - player.y) ** 2 < (this.r + player.r) ** 2 / 1.3) {
            actorList.removeActor(this);
            player.onheal();
        }
    }
}
class RectangleActor extends Actor {
    constructor(x, y, w, h) {
        super(x, y);
        this.color = "red";
        this.w = w;
        this.h = h;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(shiftX + this.x * size - this.w * size / 2, shiftY + this.y * size - this.h * size / 2, this.w * size, this.h * size);
    }
    update() {
    }
    checkCol() {
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
class Sword extends RectangleActor {
    constructor(x, y, w, h, xV, yV) {
        super(x, y, w, h);
        this.xV = xV;
        this.yV = yV;
    }
    update() {
        this.x += this.xV;
        this.y += this.yV;
        if (this.checkCol()) {
            player.onhit();
        }
    }
}
class evilWall extends RectangleActor {
    constructor(x, y, w, h, xV, yV) {
        super(x, y, w, h);
        this.xV = xV;
        this.yV = yV;
        this.state = 1;
        this.backSpeed = 1 / 2;
    }
    update() {
        if (this.state) {
            this.x += this.xV;
            this.w += this.xV * 2;
            this.y += this.yV;
            this.h += this.yV * 2;
            // console.log(this.w)
            // console.log(size)
            if (this.h > 1 && this.yV > 0) {
                this.h = 1;
                this.y = .5;
                this.state = 0;
                //     console.log("ah3")
            }
            if (this.h < -1 && this.yV < 0) {
                this.h = -1;
                this.y = .5;
                this.state = 0;
                //     console.log("ah3")
            }
            if (this.w > 1 && this.xV > 0) {
                this.w = 1;
                this.x = .5;
                this.state = 0;
                //       console.log("ahh2")
            }
            if (this.w < -1 && this.xV < 0) {
                this.w = -1;
                this.x = .5;
                this.state = 0;
                //       console.log("ahh2")
            }
            //   console.log("ahh4")
        }
        else {
            //console.log("ahh")
            this.x -= this.xV * this.backSpeed;
            this.w -= this.xV * 2 * this.backSpeed;
            this.y -= this.yV * this.backSpeed;
            this.h -= this.yV * 2 * this.backSpeed;
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
        if (this.checkCol()) {
            player.onhit();
        }
    }
}
class expandingSquare extends RectangleActor {
    constructor(x, y, growth, max, decay) {
        super(x, y, 0, 0);
        this.color = "#943140";
        this.growth = growth;
        this.max = max;
        this.decay = decay;
    }
    update() {
        if (this.w < this.max) {
            this.w += this.growth;
            this.h += this.growth;
        }
        if (this.w >= this.max) {
            this.color = "red";
            this.w = this.max;
            this.h = this.max;
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
