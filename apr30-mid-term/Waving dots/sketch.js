/**
 * The setup function is used in p5.js to set up the canvas and color mode for the sketch.
 */
function setup() {
    createCanvas(500, 500);
    colorMode(HSB, 360, 100, 100);
}


/**
 * The draw function uses nested loops to create a grid of dots and applies a wave effect to each dot based on noise
 * values, hue, and angle.
 */
function draw() {
    background(0);

    var noOfDots = 24;
    var size = width / noOfDots;

    for (var x = 0; x < noOfDots; x++) {
        for (var y = 0; y < noOfDots; y++) {
            /**
             * this is my code
             */
            var noiseVal = noise(x * 0.1, y * 0.1, frameCount * 0.01);
            var hue = map(noiseVal, 0, 1, 0, 360);
            var angle = map(noiseVal, 0, 1, 0, TWO_PI) + (mouseX * 0.01);
            wave(x * size + size / 2, y * size + size / 2, size / 2, hue, angle);
            /**
             * end of code I wrote
             */
        }
    }
}


/**
 * The wave function creates a moving ellipse with a specified size, color, and angle at the given x and y coordinates.
 * @param x - The x parameter represents the x-coordinate of the center of the wave.
 * @param y - The parameter "y" represents the y-coordinate of the center of the wave.
 * @param size - The "size" parameter in the wave function represents the diameter of the ellipse that will be drawn.
 * @param hue - The "hue" parameter represents the hue value of the color used to fill the ellipse. In the HSB color model,
 * hue represents the color itself, ranging from 0 to 360 degrees.
 * @param angle - The angle parameter represents the angle at which the wave is oscillating. It affects the vertical
 * position of the ellipse as it moves along the x-axis.
 */
function wave(x, y, size, hue, angle) {
    /**
     * this is my code
     */
    push();
    translate(x, y);
    var yOffset = sin(angle + x * 0.05 + frameCount * 0.02) * 20;
    noStroke();
    fill(hue, 100, 100);
    ellipse(0, yOffset, size);
    pop();
    /**
     * end of code I wrote
     */
}
