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
        this.xVelocity = 0;
        this.yVelocity = 0;
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
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    }
}
class FallingCircle extends Actor {
    //override Actor's constructor
    constructor(x, y, color) {
        super(x, y); // calls the Actor's constructor
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        this.y += 5;
        if (this.y > canvas.height + 50) {
            actorList.removeActor(this);
        }
    }
}
class Rock extends FallingCircle {
    //overrides FallingCircle constructor
    constructor(x, y) {
        super(x, y, "gray");
    }
    //override
    update() {
        super.update();
        //check collision with player
        if (Math.sqrt((this.x - player.x) ** 2 + (this.y - player.y) ** 2) < 35) {
            actorList.removeActor(this);
            window.alert("You died from a rock!");
        }
    }
}
class Fruit extends FallingCircle {
    constructor(x, y) {
        super(x, y, "red");
    }
    //override
    update() {
        super.update();
        //check collision with player
        if (Math.sqrt((this.x - player.x) ** 2 + (this.y - player.y) ** 2) < 35) {
            actorList.removeActor(this);
        }
    }
}
