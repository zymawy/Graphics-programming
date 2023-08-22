/* The Manager class is responsible for managing the game state, including initializing the canvas, creating and updating
the spaceship and asteroid objects, handling collisions, displaying the score and game over message, and rendering the
sky with stars. */
class Manager {
    constructor(sketch) {
        createCanvas(1200, 800);

        this.spaceship = new Spaceship();
        this.asteroids = new AsteroidSystem();
        this.atmosphereLoc = new createVector(width / 2, height * 2.9);
        this.atmosphereSize = new createVector(width * 3, width * 3);
        this.earthLoc = new createVector(width / 2, height * 3.1);
        this.earthSize = new createVector(width * 3, width * 3);
        this.starLocs = [];


        /**
         * this is my code
         */
        this.colors = ['rgb(255, 127, 63)', 'rgb(251, 223, 7)', 'rgb(249, 72, 146)', 'rgb(242, 211, 136)', 'rgb(201, 132, 116)', 'rgb(167, 210, 203)', 'rgb(135, 76, 98)', 'rgb(85, 73, 148)', 'rgb(22, 33, 62)', 'rgb(83, 52, 131)', 'rgb(76, 58, 81)', 'rgb(119, 67, 96)', 'rgb(178, 80, 104)', 'rgb(231, 171, 121)', 'rgb(130, 111, 102)', 'rgb(198, 155, 123)', 'rgb(247, 204, 172)', 'rgb(59, 154, 225)', 'rgb(59, 154, 225)', 'rgb(33, 225, 225)', 'rgb(240, 234, 190)', 'rgb(255, 220, 174)', 'rgb(255, 220, 174)', 'rgb(206, 216, 158)', 'rgb(173, 207, 159)', 'rgb(118, 186, 153)', 'rgb(58, 176, 255)', "rgb(22, 33, 62)", 'rgb(249, 242, 237)', 'rgb(255, 181, 98)', 'rgb(248, 116, 116)', 'rgb(41, 52, 98)', 'rgb(28, 214, 206)', 'rgb(254, 219, 57)', 'rgb(254, 219, 57)', 'rgb(214, 28, 78)', 'rgb(249, 72, 146)', 'rgb(255, 127, 63)', 'rgb(251, 223, 7)', 'rgb(137, 207, 253)',]
        /**
         * end of code I wrote
         */
    }

    // Set up the initial state
    setup() {
        background(0);

        return this;
    }

    /**
     * The score function displays the number of asteroids destroyed and the text "SCORE : " on the canvas.
     * @returns The "score()" function is returning the current object (this) which allows for method chaining.
     */
    score() {
        fill(0);
        textSize(40);
        text(this.asteroids.destroyed, width / 2, height - 40);
        text("SCORE : ", width / 3, height - 40);

        return this;
    }

    /**
     * The function draws an ellipse representing the Earth with a blue atmosphere around it.
     * @returns the object that the function is a method of.
     */
    drawEarth() {
        noStroke();

        // Draw atmosphere
        fill(0, 0, 255, 50);
        ellipse(this.atmosphereLoc.x, this.atmosphereLoc.y, this.atmosphereSize.x, this.atmosphereSize.y);


        // Draw Earth
        fill("rgb(255, 127, 63)");
        ellipse(this.earthLoc.x, this.earthLoc.y, this.earthSize.x, this.earthSize.y);

        return this;
    }

    checkCollisions() {

        for (let i = 0; i < this.asteroids.locations.length; i++) {
            if (this.isInside(this.spaceship.location, this.spaceship.size, this.asteroids.locations[i], this.asteroids.diameters[i])) {
                this.gameOver();
            }
        }

        for (let i = 0; i < this.asteroids.locations.length; i++) {
            if (this.isInside(this.earthLoc, this.earthSize.x, this.asteroids.locations[i], this.asteroids.diameters[i])) {
                this.gameOver();
            }
        }

        if (this.isInside(this.earthLoc, this.earthSize.y, this.spaceship.location, this.spaceship.size)) {
            this.gameOver();
        }

        if (this.isInside(this.atmosphereLoc, this.atmosphereSize.y, this.spaceship.location, this.spaceship.size)) {
            this.spaceship.setNearEarthConditions();
        }

        for (let i = 0; i < this.spaceship.bulletSystem.bullets.length; i++) {
            for (let j = 0; j < this.asteroids.locations.length; j++) {
                if (this.isInside(this.spaceship.bulletSystem.bullets[i], this.spaceship.bulletSystem.diameter, this.asteroids.locations[j], this.asteroids.diameters[j])) {
                    this.asteroids.destroy(j);
                }
            }
        }

        return this;
    }


    /**
     * The function checks if two objects are overlapping by calculating the distance between their locations and comparing
     * it to the sum of their sizes.
     * @param locA - The parameter `locA` represents the location of object A. It is an object that contains the x and y
     * coordinates of object A's position.
     * @param sizeA - The parameter "sizeA" represents the size of object A. It could be the width, height, or radius of
     * the object, depending on the context.
     * @param locB - The parameter "locB" represents the location of object B. It is an object that contains the x and y
     * coordinates of object B's position.
     * @param sizeB - The parameter "sizeB" represents the size or radius of the second object (object B).
     * @returns a boolean value. If the objects represented by locA and locB are overlapping, the function will return
     * true. Otherwise, it will return false.
     *
     */
    isInside(locA, sizeA, locB, sizeB) {
        let distance = dist(locA.x, locA.y, locB.x, locB.y);

        if (distance < (sizeA + sizeB) / 2) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * end of code I wrote
     */


    keyPressed() {
        if (keyIsPressed && keyCode === 32) { // if spacebar is pressed, fire!
            this.spaceship.fire();
        }
    }

    // Display the "Game Over" message and stop the game loop
    gameOver() {
        fill(255);
        textSize(80);
        textAlign(CENTER);
        text("GAME OVER", width / 2, height / 2);
        noLoop();
    }

    // Display the sky with stars
    runSky() {
        push();
        while (this.starLocs.length < 300) {
            this.starLocs.push(new createVector(random(width), random(height)));
        }
        fill(255);
        for (var i = 0; i < this.starLocs.length; i++) {
            rect(this.starLocs[i].x, this.starLocs[i].y, 2, 2);
        }

        if (random(1) < 0.3) this.starLocs.splice(int(random(this.starLocs.length)), 1);
        pop();

        return this;
    }

    /**
     * this is my code
     */
    runSpaceship() {
        this.spaceship.run();
        return this;
    }

    /**
     * end of code I wrote
     */


    /**
     * this is my code
     */
    runAsteroids() {
        this.asteroids.run();
        return this;
    }

    /**
     * end of code I wrote
     */

    /**
     * this is my code
     */
    getSpaceship() {
        return this.spaceship;
    }

    /**
     * end of code I wrote
     */


    /**
     * this is my code
     */
    getAsteroids() {
        return this.asteroids;
    }

    getColor() {

        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    /**
     * end of code I wrote
     */
}

