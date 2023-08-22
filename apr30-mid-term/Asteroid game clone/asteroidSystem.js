/* The AsteroidSystem class manages the spawning, movement, and destruction of asteroids in a system. */
class AsteroidSystem {
    constructor() {
        this.locations = [];
        this.velocities = [];
        this.accelerations = [];
        this.diameters = [];
        this.destroyed = 0;
    }

    /**
     * Run the asteroid system by spawning, moving, and drawing asteroids
     */
    run() {
        this.spawn();
        this.move();
        this.draw();
    }

    /**
     * Spawn asteroids at random intervals
     */
    spawn() {
        /**
         * this is my code
         */
        if (random(1) < 0.01 * (frameCount / 100)) {
            /**
             * end of code I wrote
             */
            const acceleration = createVector(0, random(0.1, 1));
            const velocity = createVector(0, 0);
            const location = createVector(random(width), 0);
            const diameter = random(30, 50);

            this.accelerations.push(acceleration);
            this.velocities.push(velocity);
            this.locations.push(location);
            this.diameters.push(diameter);
        }

    }

    /**
     * Move all asteroids
     */
    move() {
        for (let i = 0; i < this.locations.length; i++) {
            this.velocities[i].add(this.accelerations[i]);
            this.locations[i].add(this.velocities[i]);
            this.accelerations[i].mult(0);
        }
    }

    /**
     * Apply a force to all asteroids
     * @param {p5.Vector} force - The force to be applied
     */
    applyForce(force) {
        for (let i = 0; i < this.locations.length; i++) {
            this.accelerations[i].add(force);
        }
    }

    /**
     * Draw all asteroids on the canvas
     */
    draw() {
        noStroke();
        fill(200);
        for (let i = 0; i < this.locations.length; i++) {
            ellipse(this.locations[i].x, this.locations[i].y, this.diameters[i], this.diameters[i]);
        }
    }

    /**
     * Calculate the effect of gravity on each asteroid and apply acceleration
     * @param {p5.Vector} centerOfMass - The center of mass causing the gravitational force
     */
    calcGravity(centerOfMass) {
        for (let i = 0; i < this.locations.length; i++) {
            const gravity = p5.Vector.sub(centerOfMass, this.locations[i]);
            gravity.normalize();
            gravity.mult(0.001);
            this.applyForce(gravity);
        }
    }

    /**
     * Destroy an asteroid by removing its data from the arrays
     * @param {number} index - The index of the asteroid to be destroyed
     */
    destroy(index) {
        this.locations.splice(index, 1);
        this.velocities.splice(index, 1);
        this.accelerations.splice(index, 1);
        this.diameters.splice(index, 1);
        this.destroyed++;
    }
}
