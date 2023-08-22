/* The Physics class is responsible for setting up and drawing various components of a game or animation, including the
ground, propeller, tower, birds, and slingshot. */
class Physics {

    /**
     * The constructor function initializes various properties and creates an engine object.
     */
    constructor() {
        this.engine = null;
        this.propeller = null;
        this.boxes = [];
        this.birds = [];
        this.colors = [];
        this.ground = [];
        this.slingshotBird = null;
        this.slingshotConstraint = null;
        this.angle = 0;
        this.angleSpeed = 0;

        this.engine = Engine.create();
    }

    /**
     * The setup function initializes various components for a game or animation, including the canvas, ground, propeller,
     * tower, slingshot, and mouse interaction.
     */
    setup() {
        this.canvas = createCanvas(1000, 600);
        this.setupGround();
        this.setupPropeller();
        this.setupTower();
        this.setupSlingshot();
        this.setupMouseInteraction();
    }

    /**
     * The draw function is responsible for drawing the ground, propeller, tower, birds, and slingshot.
     */
    draw() {
        this.drawGround();

        this.drawPropeller();

        this.drawTower();

        this.drawBirds();

        this.drawSlingshot();
    }

    /**
     * The function "setupGround" creates a static rectangle body representing the ground and adds it to the physics
     * engine's world.
     */
    setupGround() {
        this.ground = Bodies.rectangle(500, 600, 1000, 40, {
            isStatic: true, angle: 0
        });

        World.add(this.engine.world, [this.ground]);
    }

    /* The `drawGround` function is responsible for drawing a filled shape using the vertices of the "ground" object. It
    first pushes the current drawing style onto a stack using the `push()` function. Then, it sets the fill color to a
    shade of gray using the `fill()` function. Next, it calls the `drawVertices` function, passing in the vertices of
    the "ground" object, which draws the shape on the canvas. Finally, it pops the previous drawing style from the stack
    using the `pop()` function. */
    /**
     * The function "drawGround" draws a filled shape using the vertices of the "ground" object.
     */
    drawGround() {
        push();
        fill(128);
        drawVertices(this.ground.vertices);
        pop();
    }

    /**
     * The function sets up a propeller object with specific dimensions and properties.
     * @returns the object that the function is being called on.
     */
    setupPropeller() {
        /**
         * this is my code
         */
        this.propeller = Bodies.rectangle(150, 480, 200, 15, {isStatic: true, angle: this.angle});

        World.add(this.engine.world, [this.propeller]);
        return this;
        /**
         * end of code I wrote
         */
    }

    /**
     * The function `drawPropeller` updates the angle and angular velocity of a propeller object, draws its vertices, adds
     * it to the world, and returns the updated object.
     * @returns the object that it is a method of (presumably an instance of a class).
     */
    drawPropeller() {
        push();
        /**
         * this is my code
         */
        fill(100, 0, 255);

        drawVertices(this.propeller.vertices);
        Body.setAngle(this.propeller, this.angle);
        Body.setAngularVelocity(this.propeller, this.angleSpeed);
        this.angle += this.angleSpeed;
        /**
         * end of code I wrote
         */
        pop();

        return this;
    }

    /**
     * The setupBird function creates a circular body with specified properties and adds it to the world.
     */
    setupBird() {
        var bird = Bodies.circle(mouseX, mouseY, 20, {
            friction: 0, restitution: 0.95
        });
        Matter.Body.setMass(bird, bird.mass * 10);
        World.add(this.engine.world, [bird]);
        this.birds.push(bird);
    }

    /**
     * The function `drawBirds` iterates through an array of bird objects, draws their vertices, and removes any birds that
     * are off-screen.
     */
    drawBirds() {
        push();
        /**
         * this is my code
         */

        for (let i = 0; i < this.birds.length; i++) {

            this.colors.push([200, 100, random(100, 255)]);

            fill(this.colors[i][0], this.colors[i][1], this.colors[i][2]);

            drawVertices(this.birds[i].vertices);

            if (isOffScreen(this.birds[i])) {

                removeFromWorld(this.birds[i]);

                this.birds.splice(i, 1);

                i--;

            }
        }
        /**
         * end of code I wrote
         */
        pop();
    }

    /**
     * The function "setupTower" creates a tower of boxes with different colors and adds them to the physics engine's
     * world.
     */
    setupTower() {
        /**
         * this is my code
         */
        let center = width / 2;

        for (let i = 0; i < 6; i++) {

            for (let j = 0; j < 3; j++) {

                this.colors.push([random(0, 100), random(0, 100), 50]);

                let box = Bodies.rectangle((center + 150) + 80 * j, height / 2 - 40 * i, 80, 80);

                this.boxes.push(box);

                World.add(this.engine.world, [box]);
            }

        }
        /**
         * end of code I wrote
         */

    }

    /**
     * The function "drawTower" iterates through an array of boxes, fills them with colors, draws their vertices, and
     * removes any boxes that are off-screen.
     */
    drawTower() {
        push();
        /**
         * this is my code
         */
        for (let i = 0; i < this.boxes.length; i++) {
            fill(this.colors[i][0], this.colors[i][1], this.colors[i][2]);
            drawVertices(this.boxes[i].vertices);
            if (isOffScreen(this.boxes[i])) {
                removeFromWorld(this.boxes[i]);
                this.colors.splice(i, 1);
                this.boxes.splice(i, 1);
                i--;
            }
        }
        /**
         * end of code I wrote
         */
        pop();
    }

    /**
     * The function "setupSlingshot" creates a slingshot bird object and a constraint to connect it to a point in the
     * world.
     */
    setupSlingshot() {
        /**
         * this is my code
         */
        this.slingshotBird = Bodies.circle(200, 200, 20, {friction: 0, restitution: 0.95});
        Matter.Body.setMass(this.slingshotBird, this.slingshotBird.mass * 10);

        this.slingshotConstraint = Constraint.create({
            pointA: {x: 200, y: 180},
            bodyB: this.slingshotBird,
            pointB: {x: -10, y: -10},
            stiffness: 0.01,
            damping: 0.0001
        });
        World.add(this.engine.world, [this.slingshotBird, this.slingshotConstraint]);

        /**
         * end of code I wrote
         */
    }

    /**
     * The function "drawSlingshot" draws a slingshot bird and its constraint.
     */
    drawSlingshot() {
        push();
        /**
         * this is my code
         */
        drawVertices(this.slingshotBird.vertices);
        drawConstraint(this.slingshotConstraint);
        /**
         * end of code I wrote
         */
        pop();
    }

    setupMouseInteraction() {
        let mouse = Mouse.create(this.canvas.elt);
        let mouseParams = {
            mouse: mouse, constraint: {stiffness: 0.05}
        }
        let mouseConstraint = MouseConstraint.create(this.engine, mouseParams);
        mouseConstraint.mouse.pixelRatio = pixelDensity();
        World.add(this.engine.world, mouseConstraint);
    }

    /**
     * this is my code
     */
    /**
     * The function increases the angle speed by a specified amount and returns the updated value.
     * @param [speed=0.01] - The speed parameter is a number that represents the amount by which the angle speed should be
     * increased.
     * @returns the object itself (this) after increasing the angleSpeed by the specified speed.
     */
    increaseAngleSpeed(speed = 0.01) {
        this.angleSpeed += speed;
        return this;
    }

    /**
     * end of code I wrote
     */

    /**
     * this is my code
     */
    /**
     * The function decreases the angle speed by a specified amount.
     * @param [speed=0.01] - The speed parameter is a number that represents the amount by which the angle speed should be
     * decreased.
     * @returns the object itself (this) after decreasing the angleSpeed by the specified speed.
     */
    decreaseAngleSpeed(speed = 0.01) {

        this.angleSpeed -= speed;
        return this;
    }

    /**
     * end of code I wrote
     */
}
