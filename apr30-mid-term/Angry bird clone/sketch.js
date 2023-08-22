// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

const startTime = new Date().getTime();

const physics = new Physics()

function setup() {
    physics.setup();
}


function draw() {
    background(29, 17, 53);

    Engine.update(physics.engine);

    physics.draw();

    drawCountdown();

}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        physics.increaseAngleSpeed(0.01)
    } else if (keyCode == RIGHT_ARROW) {
        physics.decreaseAngleSpeed(0.01)
    }
}

function keyTyped() {
    //if 'b' create a new bird to use with propeller
    if (key === 'b') {
        physics.setupBird();
    }

    //if 'r' reset the slingshot
    if (key === 'r') {
        removeFromWorld(physics.slingshotBird);
        removeFromWorld(physics.slingshotConstraint);
        physics.setupSlingshot();
    }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased() {
    setTimeout(() => {
        physics.slingshotConstraint.bodyB = null;
        physics.slingshotConstraint.pointA = {x: 0, y: 0};
    }, 100);
}

////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body) {
    var pos = body.position;
    return (pos.y > height || pos.x < 0 || pos.x > width);
}

////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
    World.remove(physics.engine.world, body);
}

////////////////////////////////////////////////////////////
function drawVertices(vertices) {
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}

////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
    push();
    var offsetA = constraint.pointA;
    var posA = {x: 0, y: 0};
    if (constraint.bodyA) {
        posA = constraint.bodyA.position;
    }
    var offsetB = constraint.pointB;
    var posB = {x: 0, y: 0};
    if (constraint.bodyB) {
        posB = constraint.bodyB.position;
    }
    strokeWeight(5);
    stroke(255);
    line(posA.x + offsetA.x, posA.y + offsetA.y, posB.x + offsetB.x, posB.y + offsetB.y);
    pop();
}

function drawCountdown() {
    let nowTime = new Date().getTime();
    let count = 60 - Math.floor((nowTime - startTime) / 1000);

    console.log(physics.boxes.length == 0);

    if (60 - Math.floor((nowTime - startTime) / 1000) > 0 && physics.boxes.length !== 0) {
        push();
        fill(250, 0, 0);
        textSize(32);
        text('TIME REMAINS', 50, 50);
        text(count, width / 3, 50);
        pop();
    } else if (physics.boxes.length == 0) {
        push();
        fill(250, 0, 0);
        textSize(32);
        text("YOU WIN", width / 3, 50);
        pop();
        noLoop();
    } else {
        push();
        fill(250, 0, 0);
        textSize(32);
        text("GAME OVER", width / 3, 50);
        pop();
        noLoop();
    }
}



