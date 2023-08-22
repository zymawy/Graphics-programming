/* The BulletSystem class manages a collection of bullets, allowing them to be fired, moved, drawn, and removed when they
leave the screen. */
class BulletSystem {
    /**
     * The constructor function initializes an array to store bullets, sets the velocity of the bullets to move upwards, and
     * sets the diameter of the bullets to 10.
     */
    constructor() {
        this.bullets = [];
        this.velocity = createVector(0, -5);
        this.diameter = 10;
    }

    /**
     * The "run" function executes the "move", "draw", and "handleEdges" functions.
     */
    run() {
        this.move();
        this.draw();
        this.handleEdges();
    }

    /**
     * The "fire" function adds a new bullet to the "bullets" array with the specified x and y coordinates.
     * @param x - The x-coordinate of the bullet's starting position.
     * @param y - The parameter "y" in the "fire" function represents the y-coordinate of the position where the bullet will
     * be fired.
     */
    fire(x, y) {
        this.bullets.push(createVector(x, y));
    }


    /**
     * The draw function fills the canvas with white color and draws ellipses for each bullet in the bullets array.
     */
    draw() {
        fill(255);
        for (var i = 0; i < this.bullets.length; i++) {
            ellipse(this.bullets[i].x, this.bullets[i].y, this.diameter, this.diameter);
        }
    }

    /**
     * The move function updates the y position of each bullet in the bullets array based on the velocity.
     */
    move() {
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].y += this.velocity.y;
        }
    }

    /**
     * The function "handleEdges" removes bullets from an array if their y-coordinate is less than 0.
     */
    handleEdges() {
        /**
         * this is my code
         */
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            if (this.bullets[i].y < 0) {
                this.bullets.splice(i, 1);
            }
        }
        /**
         * end of code I wrote
         */
    }
}
