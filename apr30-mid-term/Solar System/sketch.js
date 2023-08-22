/* The SolarSystem class creates a visualization of the sun, earth, and moon rotating around each other. */

/**
 * this is my code
 */
class SolarSystem {
    /**
     * this is my code
     */
    constructor() {
        this.speed = null;
    }

    setup() {
        createCanvas(900, 700);
    }

    /**
     * end of code I wrote
     */

    /**
     * The function "draw" creates a background, sets the speed based on the frame count, and then creates a sun, earth, and
     * moon.
     */
    draw() {
        background(0);

        this.speed = frameCount;

        /**
         * this is my code
         * Sun
         */
        this.createSun()
        /**
         * end of code I wrote
         */


        /**
         * this is my code
         * Earth
         */
        this.createEarth()
        /**
         * end of code I wrote
         */


        /**
         * this is my code
         * Moon
         */
        this.createMoon()
        /**
         * end of code I wrote
         */


        /**
         * this is my code
         * Moon (Features)
         */
        this.createAsteroid()
        /**
         * end of code I wrote
         */


    }

    createAsteroid() {
        rotate(radians(-this.speed * 2));
        translate(20, 20);
        this.celestialObj(color('#F27A5E'), 15);
    }

    /**
     *  this is my code
     * The function creates a sun object and rotates it at a certain speed (SUN).
     */
    createSun() {
        translate(width / 2, height / 2);
        push();
        rotate(radians(this.speed / 3));
        this.celestialObj(color('#D93D04'), 200);
        pop();

    }

    /**
     * end of code I wrote
     */

    /**
     * this is my code
     *
     * The function creates a representation of the Earth and rotates it at a given speed (Earth).
     */
    createEarth() {

        rotate(radians(this.speed));
        translate(300, 0);

        push();
        rotate(radians(this.speed));

        this.celestialObj(color('#D9C0A3'), 80);
        pop();
    }

    /**
     * end of code I wrote
     */


    /**
     * this is my code
     * The function creates a moon object and applies rotation and translation transformations to it.
     */
    createMoon() {
        rotate(radians(-this.speed * 2));
        translate(100, 0);
        this.celestialObj(color('#8C8888'), 30); // MOON
    }

    /**
     * end of code I wrote
     */

    celestialObj(c, size) {
        strokeWeight(5);
        fill(c);
        stroke(0);
        ellipse(0, 0, size, size);
        line(0, 0, size / 2, 0);
    }
}

/**
 * end of code I wrote
 */

/**
 * this is my code
 */
const solarSystem = new SolarSystem();

/**
 * end of code I wrote
 */


function setup() {
    /**
     * this is my code
     */
    solarSystem.setup();
    /**
     * end of code I wrote
     */
}

function draw() {
    /**
     * this is my code
     */
    solarSystem.draw();
    /**
     * end of code I wrote
     */
}
