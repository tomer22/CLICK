

// Define the properties/ behavior of Actor 
class Actor {
    
    //List all properties:
    x : number;
    y : number;

    constructor(x : number, y : number) {
        //set up properties
        this.x = x
        this.y = y
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
    r : number;

    //override
    constructor(x : number, y : number) {
        super(x,y);
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.r = size/20;
        
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
        //ctx.fillStyle = "blue";
        //ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(shiftX+this.x*size, shiftY+this.y*size, this.r, 0 , Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        //console.log(this.x,this.y)
    }

    update() : void {
        this.r = size/20;
        this.x += this.xVelocity/(500);
        this.y += this.yVelocity/(500);

        // Tampering with collision to make it look nicer
        let wallShift = this.r/size;
        if (this.x > 1-wallShift){
            this.x =1-wallShift;
        }
        if (this.x < wallShift){
            this.x =wallShift;
        }
        if (this.y > 1-wallShift){
            this.y =1-wallShift;
        }
        if (this.y < wallShift){
            this.y =wallShift;
        }
    }


}

class FallingCircle extends Actor {

    color : string;
    r : number;
    //override Actor's constructor
    constructor(x : number, y : number, color : string) {
        super(x, y ); // calls the Actor's constructor
        this.color = color;
        this.r = size/30;
    }

    draw() : void {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(shiftX+this.x*size, shiftY+this.y*size, this.r, 0 , Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() : void {
        this.y += .005;
        this.r = size/20;
        if (this.y > 1.1){
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
        if ( (this.x- player.x) ** 2 + (this.y - player.y) ** 2  < (this.r+player.r)**2/(1.3*(size**2))){
            window.alert("You died from a rock!");
            actorList.removeActor(this);
        }
        //     actorList.removeActor(this);
        //     //
        // }
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
        if ( (this.x- player.x) ** 2 + (this.y - player.y) ** 2  < (this.r+player.r)**2/(1.3*(size**2))){
            actorList.removeActor(this);
        }
    }
}

class Flower extends Actor {
   
    r : number;
    color : string;
    speedX:number;
    speedY : number;
    rotate : number;
    speedR : number;
    state : number;

    constructor(x : number, y : number, r : number) {
        //set up properties
        super(x,y);
        this.r = r;
        this.state = Math.floor(Math.random()*1000);
        this.color = "gray";
        this.speedX = (Math.random()*5+1)*(2*Math.floor(2*Math.random())-1);
        this.speedY = (Math.random()*5+1)*(2*Math.floor(2*Math.random())-1);
        this.rotate = 0;
        this.speedR = (2*Math.floor(2*Math.random())-1)*(Math.random()/6+.1);
    }
    draw() : void {
    
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        for (let i=0;i<2*Math.PI*10;i+=.1)
            ctx.arc(this.x, this.y, Math.abs(Math.cos((i+this.rotate)*1.25)*Math.sin((i+this.rotate)*1.25))*this.r*2, i, i+.1);
        ctx.stroke()
        //ctx.arc(this.x,this.y,this.r, 0 , Math.PI * 2);
        ctx.closePath();
    }
    update() : void {
        // Update properties or other Actors in the actorList.
        this.rotate+= this.speedR;
        this.x += this.speedX;
        this.y+= this.speedY;
    }
}