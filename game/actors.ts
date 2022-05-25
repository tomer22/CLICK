// Define the properties/ behavior of Actor 
class Actor {
    
    //List all properties:
    x : number;
    y : number;

    constructor(x : number, y : number) {
        //set up properties
        this.x = x;
        this.y = y;
    }

    /**
     * Draw the actor on the canvas.
     */
    draw() : void {
        // Use ctx to draw. A sample (drawing a small circle):
    }

    /**
     * Update this actor for the next frame.
     */
    update() : void {
        // Update properties or other Actors in the actorList.
    }

    //Add more methods as helpful:

}

// Recommended: Create sub-classes of Actor:

// class SubActor extends Actor { ... }

class Player extends Actor {

    xVelocity: number;
    yVelocity : number;

    //override
    constructor(x : number, y : number) {
        super(x,y);
        this.xVelocity = 0;
        this.yVelocity = 0;
    }

    moveLeft() : void {
        this.xVelocity = -5;
    }

    moveRight() : void {
        this.xVelocity = 5;
    }

    moveUp() : void {
        this.yVelocity = -5;
    }

    moveDown() : void {
        this.yVelocity = 5;
    }

    draw() : void {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
    }

    update() : void {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    }


}

class FallingCircle extends Actor {

    color : string;

    //override Actor's constructor
    constructor(x : number, y : number, color : string) {
        super(x, y ); // calls the Actor's constructor
        this.color = color;
    }

    draw() : void {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0 , Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() : void {
        this.y += 5;

        if (this.y > canvas.height + 50){
            actorList.removeActor(this);
        }
    }
}

class Rock extends FallingCircle {
    //overrides FallingCircle constructor
    constructor(x : number, y : number){
        super(x, y, "gray");
    }

    //override
    update() {
        super.update()
        //check collision with player
        if ( Math.sqrt( (this.x - player.x) ** 2 + (this.y - player.y) ** 2 ) < 20){
            actorList.removeActor(this);
            window.alert("You died from a rock!");
        }
    }
}

class Fruit extends FallingCircle {
    constructor(x : number, y : number){
        super(x, y, "red");
    }

    //override
    update() {
        super.update()
        //check collision with player
        if ( Math.sqrt( (this.x - player.x) ** 2 + (this.y - player.y) ** 2 ) < 20){
            actorList.removeActor(this);
        }
    }
}