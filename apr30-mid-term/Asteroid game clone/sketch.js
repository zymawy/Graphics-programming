let manager = null;

/**
 * The setup function creates a new instance of the Manager class.
 */
function setup() {

    /**
     * this is my code
     */
    manager = new Manager();
    /**
     * end of code I wrote
     */
}

/**
 * The function "draw" sets up and runs a game, including the sky, spaceship, asteroids, earth, collision detection, and
 * scoring.
 */
function draw() {


    /**
     * this is my code
     * let's get going and let our manager prepare our gameify :)
     */
    manager
        .setup()
        .runSky()
        .runSpaceship()
        .runAsteroids()
        .drawEarth()
        .checkCollisions()
        .score();
    /**
     * end of code I wrote
     */
}

/**
 * The function `keyPressed` calls the `keyPressed` method of the `manager` object.
 */
function keyPressed() {
    manager.keyPressed();
}
