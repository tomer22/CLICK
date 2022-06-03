var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Define the properties/ behavior of Actor 
var Actor = /** @class */ (function () {
    function Actor(x, y) {
        //set up properties
        this.x = x;
        this.y = y;
    }
    /**
     * Draw the actor on the canvas.
     */
    Actor.prototype.draw = function () {
        // Use ctx to draw. A sample (drawing a small circle):
    };
    /**
     * Update this actor for the next frame.
     */
    Actor.prototype.update = function () {
        // Update properties or other Actors in the actorList.
    };
    return Actor;
}());
// Recommended: Create sub-classes of Actor:
// class SubActor extends Actor { ... }
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    //override
    function Player(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.iFrames = 0;
        _this.iTime = 60;
        _this.color = "#1451e0";
        _this.iColor = "#587acc";
        _this.xVelocity = 0;
        _this.yVelocity = 0;
        _this.r = 1 / 45;
        return _this;
    }
    Player.prototype.moveLeft = function () {
        this.xVelocity = -5 / (500);
    };
    Player.prototype.moveRight = function () {
        this.xVelocity = 5 / (500);
    };
    Player.prototype.moveUp = function () {
        this.yVelocity = -5 / (500);
    };
    Player.prototype.moveDown = function () {
        this.yVelocity = 5 / (500);
    };
    Player.prototype.draw = function () {
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
        ctx.arc(shiftX + this.x * size, shiftY + this.y * size, this.r * size * 1.5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        //console.log(this.x,this.y)
    };
    Player.prototype.update = function () {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        // Tampering with collision to make it look nicer
        var wallShift = this.r;
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
    };
    // When player is hit, if it is has not been recently hit, take damage
    Player.prototype.onhit = function () {
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
        var beat = new Audio('audio/hitsound.mp3');
        beat.play();
    };
    Player.prototype.onheal = function () {
        pHth++;
        if (pHth > mxHth) {
            pHth = mxHth;
        }
    };
    return Player;
}(Actor));
var FallingCircle = /** @class */ (function (_super) {
    __extends(FallingCircle, _super);
    //override Actor's constructor
    function FallingCircle(x, y, color) {
        var _this = _super.call(this, x, y) || this;
        _this.color = color;
        _this.r = 1 / 30;
        // Lots of math, basically just generates circles in a ring around the center,
        // staggered a bit so they don't all converge at one point
        _this.ang = Math.random() * 2 * Math.PI;
        _this.y = .5 + (.5 - y) * Math.sin(_this.ang) + x * Math.cos(_this.ang) / 2;
        _this.x = .5 + (.5 - y) * Math.cos(_this.ang) + x * Math.sin(_this.ang) / 2;
        _this.speed = Math.random() / 100 + .005;
        return _this;
    }
    FallingCircle.prototype.draw = function () {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(shiftX + this.x * size, shiftY + this.y * size, size * this.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    };
    FallingCircle.prototype.update = function () {
        // Angular movement
        this.y -= this.speed * Math.sin(this.ang);
        this.x -= this.speed * Math.cos(this.ang);
        if (Math.pow((this.y - .5), 2) + Math.pow((this.x - .5), 2) > 3) {
            actorList.removeActor(this);
        }
    };
    return FallingCircle;
}(Actor));
var Rock = /** @class */ (function (_super) {
    __extends(Rock, _super);
    //overrides FallingCircle constructor
    function Rock(x, y) {
        if (y === void 0) { y = -.5; }
        return _super.call(this, x, y, "red") || this;
    }
    //override
    Rock.prototype.update = function () {
        _super.prototype.update.call(this);
        //check collision with player
        if (Math.pow((this.x - player.x), 2) + Math.pow((this.y - player.y), 2) < Math.pow((this.r + player.r), 2)) {
            //window.alert("You died from a rock!");
            player.onhit();
            //actorList.removeActor(this);
        }
    };
    return Rock;
}(FallingCircle));
// Rocks which follow a pattern
var PatternRock = /** @class */ (function (_super) {
    __extends(PatternRock, _super);
    function PatternRock(lead, f, dir, x, y) {
        if (lead === void 0) { lead = 0; }
        if (dir === void 0) { dir = 1; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = -.5; }
        var _this = _super.call(this, x, y) || this;
        _this.lead = lead;
        _this.f = f;
        _this.dir = dir;
        _this.speed = _this.dir / 100;
        // Generate from one of 4 sides
        if (_this.lead === 0 && _this.speed > 0) {
            _this.x = -.5;
        }
        else if (_this.lead === 0 && _this.speed < 0) {
            _this.x = 1.5;
        }
        else if (_this.lead === 1 && _this.speed > 0) {
            _this.y = -.5;
        }
        else if (_this.lead === 1 && _this.speed < 0) {
            _this.y = 1.5;
        }
        return _this;
    }
    //override
    PatternRock.prototype.update = function () {
        // Either x -> y or y-> x
        if (this.lead == 0) {
            this.x += this.speed;
            this.y = this.f(this.x);
        }
        if (this.lead == 1) {
            this.y += this.speed;
            this.x = this.f(this.y);
        }
        if (Math.pow((this.y - .5), 2) + Math.pow((this.x - .5), 2) > 3) {
            actorList.removeActor(this);
        }
        //check collision with player
        if (Math.pow((this.x - player.x), 2) + Math.pow((this.y - player.y), 2) < Math.pow((this.r + player.r), 2)) {
            //window.alert("You died from a rock!");
            player.onhit();
            //actorList.removeActor(this);
        }
    };
    return PatternRock;
}(Rock));
var Fruit = /** @class */ (function (_super) {
    __extends(Fruit, _super);
    function Fruit(x, y) {
        if (y === void 0) { y = -.5; }
        return _super.call(this, x, y, "green") || this;
    }
    //override
    Fruit.prototype.update = function () {
        _super.prototype.update.call(this);
        //check collision with player
        if (Math.pow((this.x - player.x), 2) + Math.pow((this.y - player.y), 2) < Math.pow((this.r + player.r), 2)) {
            actorList.removeActor(this);
            player.onheal();
        }
    };
    return Fruit;
}(FallingCircle));
// Basic rectangle actor (as the name suggests)
var RectangleActor = /** @class */ (function (_super) {
    __extends(RectangleActor, _super);
    function RectangleActor(x, y, w, h) {
        var _this = _super.call(this, x, y) || this;
        _this.color = "red";
        _this.w = w;
        _this.h = h;
        return _this;
    }
    RectangleActor.prototype.draw = function () {
        // Rectangles x and y determine its center
        ctx.fillStyle = this.color;
        ctx.fillRect(shiftX + this.x * size - this.w * size / 2, shiftY + this.y * size - this.h * size / 2, this.w * size, this.h * size);
    };
    RectangleActor.prototype.update = function () {
    };
    RectangleActor.prototype.checkCol = function () {
        // Nice circle rectangle collision algorithm I found from StackOverflow
        var distX = Math.abs(player.x - this.x);
        var distY = Math.abs(player.y - this.y);
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
        var crnrDist = (player.x - Math.abs(this.w) / 2) ^ 2 +
            (player.y - Math.abs(this.h) / 2) ^ 2;
        return (crnrDist <= (player.r ^ 2));
    };
    return RectangleActor;
}(Actor));
// Swords, wooo. Effectively just rectangles that move
var Sword = /** @class */ (function (_super) {
    __extends(Sword, _super);
    function Sword(x, y, w, h, xV, yV) {
        var _this = _super.call(this, x, y, w, h) || this;
        _this.xV = xV;
        _this.yV = yV;
        return _this;
    }
    Sword.prototype.update = function () {
        // They literally just move
        this.x += this.xV;
        this.y += this.yV;
        if (this.checkCol()) {
            player.onhit();
        }
    };
    return Sword;
}(RectangleActor));
// Fun one, slams out then retracts
var evilWall = /** @class */ (function (_super) {
    __extends(evilWall, _super);
    function evilWall(x, y, w, h, xV, yV) {
        var _this = _super.call(this, x, y, w, h) || this;
        _this.xV = xV;
        _this.yV = yV;
        _this.state = 1;
        _this.backSpeed = 1 / 2;
        return _this;
    }
    evilWall.prototype.update = function () {
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
            // The same thing as above, but in the other direction and slightly slower
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
        if (this.checkCol()) {
            player.onhit();
        }
    };
    return evilWall;
}(RectangleActor));
// Squares go boom
var expandingSquare = /** @class */ (function (_super) {
    __extends(expandingSquare, _super);
    function expandingSquare(x, y, growth, max, decay) {
        var _this = _super.call(this, x, y, 0, 0) || this;
        // Start as warning color
        _this.color = "#943140";
        _this.growth = growth;
        _this.max = max;
        _this.decay = decay;
        return _this;
    }
    expandingSquare.prototype.update = function () {
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
    };
    return expandingSquare;
}(RectangleActor));
// Just a bunch stuff that was way too complicated just to draw a triangle that points a certain way and 
// disappears a bit later
var Warning = /** @class */ (function (_super) {
    __extends(Warning, _super);
    function Warning(x, y, b, h, dir, span) {
        var _this = _super.call(this, x, y) || this;
        _this.span = span;
        _this.h = h;
        _this.b = b;
        _this.dir = dir;
        return _this;
    }
    Warning.prototype.draw = function () {
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
    };
    return Warning;
}(Actor));
//class Flower extends Actor {
var Flower = /** @class */ (function (_super) {
    __extends(Flower, _super);
    function Flower(x, y, r) {
        var _this = 
        //set up properties
        _super.call(this, x, y) || this;
        _this.r = r;
        _this.state = Math.floor(Math.random() * 1000);
        _this.color = "gray";
        _this.speedX = (Math.random() * 5 + 1) * (2 * Math.floor(2 * Math.random()) - 1);
        _this.speedY = (Math.random() * 5 + 1) * (2 * Math.floor(2 * Math.random()) - 1);
        _this.rotate = 0;
        _this.speedR = (2 * Math.floor(2 * Math.random()) - 1) * (Math.random() / 6 + .1);
        return _this;
    }
    Flower.prototype.draw = function () {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        for (var i = 0; i < 2 * Math.PI * 10; i += .1)
            ctx.arc(this.x, this.y, Math.abs(Math.cos((i + this.rotate) * 1.25) * Math.sin((i + this.rotate) * 1.25)) * this.r * 2, i, i + .1);
        ctx.stroke();
        //ctx.arc(this.x,this.y,this.r, 0 , Math.PI * 2);
        ctx.closePath();
    };
    Flower.prototype.update = function () {
        // Update properties or other Actors in the actorList.
        this.rotate += this.speedR;
        this.x += this.speedX;
        this.y += this.speedY;
    };
    return Flower;
}(Actor));
