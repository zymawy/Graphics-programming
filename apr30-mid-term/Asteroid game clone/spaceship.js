/* The Spaceship class represents a spaceship object in a game, with properties such as velocity, location, acceleration,
maximum velocity, bullet system, size, and friction. */
class Spaceship {
    /**
     * This is a constructor function for a spaceship object in JavaScript, which initializes its properties such as
     * velocity, location, acceleration, maximum velocity, bullet system, size, and friction.
     */
    constructor() {
        this.velocity = createVector(0, 0);
        this.location = createVector(width / 2, height / 2);
        this.acceleration = createVector(0, 0);
        this.maxVelocity = 5;
        this.bulletSystem = new BulletSystem();
        this.size = 50;
        this.friction = createVector(0, 0);
    }

    /**
     * The "run" function executes various actions related to a bullet system, including drawing, moving, handling edges,
     * and handling interaction.
     */
    run() {

        /**
         * this is my code
         */
        this.bulletSystem.run();
        this.draw();
        this.move();
        this.handleEdges();
        this.handleInteraction();
        /**
         * end of code I wrote
         */
    }

    /**
     * The draw function draws a triangle shape on the canvas.
     */
    draw() {
        fill(125);
        triangle(this.location.x - this.size / 2, this.location.y + this.size / 2, this.location.x + this.size / 2, this.location.y + this.size / 2, this.location.x, this.location.y - this.size / 2);
    }

    /**
     * The "move" function updates the location of an object based on its velocity and acceleration.
     */
    move() {
        /**
         * this is my code
         */
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxVelocity);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
        /**
         * end of code I wrote
         */
    }

    /** The `createVector()` function is a built-in function in p5.js, a JavaScript library for creative coding. It creates a
     new vector object with the specified x and y components. In the code snippet provided, `createVector(0, 0)` is used to
     create a vector object representing the initial velocity, location, and acceleration of the spaceship. */
    applyForce(force) {
        this.acceleration.add(force);
    }

    /**
     * The function "handleInteraction" applies forces to an object based on arrow key inputs.
     */
    handleInteraction() {
        /**
         * this is my code
         */
        if (keyIsDown(LEFT_ARROW)) {

            this.applyForce(createVector(-0.1, 0));
            fill(147, 112, 219);

            this.drawJetThrusters({
                x1: this.location.x + 21,
                y1: this.location.y + 15,
                x2: this.location.x + this.size / 2 + 10,
                y2: this.location.y + this.size / 2,
                x3: this.location.x + 30,
                y3: this.location.y + 10
            });
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.applyForce(createVector(0.1, 0));
            fill(147, 112, 219);
            this.drawJetThrusters({
                x1: this.location.x - 21,
                y1: this.location.y + 15,
                x2: this.location.x - this.size / 2 - 10,
                y2: this.location.y + this.size / 2,
                x3: this.location.x - 30,
                y3: this.location.y + 10
            });
        }
        if (keyIsDown(UP_ARROW)) {
            this.applyForce(createVector(0, -0.1));
            fill(147, 112, 219);
            this.drawJetThrusters({
                x1: this.location.x + 15,
                y1: this.location.y + this.size / 2,
                x2: this.location.x - 15,
                y2: this.location.y + this.size / 2,
                x3: this.location.x,
                y3: this.location.y + this.size / 2 + 10
            });
        }

        if (keyIsDown(DOWN_ARROW)) {
            this.applyForce(createVector(0, 0.1));
        }

        this.drawWings()

        /**
         * end of code I wrote
         */
    }

    /**
     * The "fire" function is used to initiate the firing of a bullet from the current location.
     */
    fire() {
        this.bulletSystem.fire(this.location.x, this.location.y);
    }

    /**
     * The function "handleEdges" ensures that the location of an object stays within the boundaries of the canvas.
     */
    handleEdges() {
        if (this.location.x < 0) {
            this.location.x = width;
        } else if (this.location.x > width) {
            this.location.x = 0;
        }
        if (this.location.y < 0) {
            this.location.y = height;
        } else if (this.location.y > height) {
            this.location.y = 0;
        }
    }

    /**
     * The function sets the near-Earth conditions for a spaceship by applying an upward velocity and calculating and
     * applying a friction force.
     */
    setNearEarthConditions() {
        /**
         * this is my code
         */
        this.velocity.add(createVector(0, 0.05));
        this.friction = this.velocity.copy().div(30).mult(-1);
        this.applyForce(this.friction);
        /**
         * end of code I wrote
         */
    }

    /**
     * The function "drawJetThrusters" draws a triangle using the coordinates provided in the "object" parameter.
     * @param object - The object parameter represents an object that contains the coordinates of the three points of a
     * triangle. The coordinates are represented by the variables x1, y1, x2, y2, x3, and y3.
     */
    drawJetThrusters(object) {
        /**
         * this is my code
         */
        triangle(object.x1, object.y1, object.x2, object.y2, object.x3, object.y3)
        /**
         * end of code I wrote
         */
    }

    /**
     * The function "drawWings" draws two triangles to represent wings.
     */
    drawWings() {
        /**
         * this is my code
         */
        fill(125);

        triangle(this.location.x + 10, this.location.y, this.location.x + this.size / 2, this.location.y + this.size / 2, this.location.x + 30, this.location.y + 10)


        triangle(this.location.x - 10, this.location.y, this.location.x - this.size / 2, this.location.y + this.size / 2, this.location.x - 30, this.location.y + 10)
        /**
         * end of code I wrote
         */
    }
}
