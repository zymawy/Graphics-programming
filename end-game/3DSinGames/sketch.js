class ThreeDSin {
    constructor() {
        // Array to store the locations of the confetti
        this.confettiLocations = [];
        // Array to store the rotation angles of the confetti
        this.confettiRotations = [];
    }

    // Method to initialize the sketch
    setup() {
        // Create a canvas with the specified dimensions and renderer
        createCanvas(900, 800, WEBGL);
        // Set the angle mode to degrees for rotation calculations
        angleMode(DEGREES);

        // Generate random locations and rotations for the confetti
        for (let i = 0; i < 200; i++) {
            // Create a random vector for the confetti location within the specified range
            const location = createVector(random(-500, 500), random(-800, 0), random(-500, 500));
            // Add the location vector to the confettiLocations array
            this.confettiLocations.push(location);
            // Generate a random rotation angle for the confetti within 0-360 degrees
            this.confettiRotations.push(random(0, 360));
        }

        // Return the current object to allow method chaining
        return this;
    }

    // Method to draw the sketch
    draw() {
        // Set the background color
        background(125);

        // Set up the camera position and orientation using trigonometric functions
        camera(cos(frameCount / 2) * 1200, -600, sin(frameCount / 2) * 1200, 0, 0, 0, 0, 1, 0);

        // Apply a material to the geometry for rendering
        normalMaterial();

        // Create a grid of boxes
        for (let i = -400; i <= 400; i += 50) {
            for (let j = -400; j <= 400; j += 50) {
                // Calculate the distance from the center of the grid to the current box
                const distance = dist(0, 0, 0, i, 0, j);
                // Map the distance to a length between 100 and 300 based on sine function and frameCount
                const length = map(sin(frameCount * 2 + distance), -1, 1, 100, 300);
                push();
                stroke(0);
                strokeWeight(2);
                translate(i, 0, j);
                // Draw a box at the current position with the calculated length
                box(50, length, 50);
                pop();
            }
        }

        // Draw the confetti at their respective locations and rotations
        for (let i = 0; i < this.confettiLocations.length; i++) {
            push();
            translate(this.confettiLocations[i].x, this.confettiLocations[i].y, this.confettiLocations[i].z);
            // Rotate the confetti around the X-axis based on the stored rotation angle
            rotateX(this.confettiRotations[i]);
            // Draw a plane (2D shape) at the current confetti location
            plane(15);
            pop();
        }

        // Animate the confetti by changing their positions and rotations
        this.animateConfetti();
    }

    // Method to animate the confetti
    animateConfetti() {
        for (let i = 0; i < this.confettiLocations.length; i++) {
            // Move the confetti upwards and rotate them
            if (this.confettiLocations[i].y < 0) {
                this.confettiLocations[i].y += 1;
                this.confettiRotations[i] += 10;
            }
            // Reset the confetti to the top once they reach the bottom
            else {
                this.confettiLocations[i].y = -800;
            }
        }
    }
}

const dSin = new ThreeDSin();

function setup() {
    dSin.setup();
}

function draw() {
    dSin.draw();
}