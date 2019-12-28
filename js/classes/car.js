class Car extends JunctionObject {

    constructor(car) {
        super(car);
        this.color = car.color.toLowerCase();
        this.carOff = document.getElementById(this.color + BLINKER_OFF);
        this.carRight = document.getElementById(this.color + BLINKER_RIGHT);
        this.carLeft = document.getElementById(this.color + BLINKER_LEFT);

        this.layer.style.transformOrigin = DEFAULT_TRANSFORM_ORIGIN;
        this.transformX = DEFAULT_POSITION.x;
        this.transformY = DEFAULT_POSITION.y;
        this.angle = DEFAULT_ANGLE;

        this.setDefaultPosition(car.position, car.angle);
        this.setDefaultBlinkers(car.blinker);
    }

    setDefaultPosition(position = DEFAULT_POSITION, angle = DEFAULT_ANGLE) {
        this.moveAbsolute(position.x, position.y);
        this.rotateAbsolute(angle);
    }

    setDefaultBlinkers(blinker = DEFAULT_BLINKER_STATE) {
        BLINKERS[blinker](this);
    }

    setVisibilityLayerStates(off, right, left) {
        this.carOff.style.visibility = off;
        this.carRight.style.visibility = right;
        this.carLeft.style.visibility = left;
    }

    turnOffBlinkers() {
        this.setVisibilityLayerStates("visible", "hidden", "hidden");
    }

    turnOnRightBlinker() {
        this.setVisibilityLayerStates("hidden", "visible", "hidden");
    }

    turnOnLeftBlinker() {
        this.setVisibilityLayerStates("hidden", "hidden", "visible");
    }

    hideCar() {
        this.setVisibilityLayerStates("hidden", "hidden", "hidden");
    }

    showCar() {
        this.setVisibilityLayerStates("visible", "hidden", "hidden");
    }

    moveRelative(a, b) {
        this.transformX += a;
        this.transformY += b;
        this.updateCar();
    }

    moveAbsolute(x, y) {
        this.transformX = x;
        this.transformY = y;
        this.updateCar();
    }

    rotateRelative(angle) {
        this.angle += angle;
        this.updateCar();
    }

    rotateAbsolute(angle) {
        this.angle = angle;
        this.updateCar();
    }

    updateCar() {
        $(this.layer).attr("transform", "translate(" + this.transformX + "," + this.transformY + ") rotate(" + this.angle + ")");
    }

    // IMPLEMENTATION OF ACTIONS
    sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async turnCarBasedOnAction(car, action) { 
        let carStartX = car.transformX;
        let carStartY = car.transformY;

        let quadrant = QUADRANTS[action.quadrant][action.clockwise ? "clockwise" : "counterclockwise"];

        for (let i = quadrant.start; i != (quadrant.end + quadrant.increment); i += quadrant.increment) {
            this.turnCar(car, i, action.distance, carStartX, carStartY, quadrant);
            await this.sleep(TURN_ANIMATION_PAUSE_DURATION);
        }
    }

    turnCar(car, angle, distance, startX, startY, quadrant) {
        var centerX = startX + quadrant.vector[0] * CAR_HALF_WIDTH + quadrant.vector[1] * distance;
        var centerY = startY + quadrant.vector[2] * CAR_HALF_WIDTH + quadrant.vector[3] * distance;
        var x = centerX + Math.cos(-angle * Math.PI / 180) * (distance + CAR_HALF_WIDTH);
        var y = centerY + Math.sin(-angle * Math.PI / 180) * (distance + CAR_HALF_WIDTH);
        car.moveAbsolute(x, y);
        car.rotateAbsolute(quadrant.baseAngle + -1 * angle);
    }

    async moveCarBasedOnAction(car, action) {
        let distance = action.distance;
        let dir_vec = DIRECTIONS_VECTOR[action.direction];

        for(let i = 0; i < distance; i++) {
            car.moveRelative(dir_vec[0], dir_vec[1]);
            await this.sleep(STRIAGHT_ANIMATION_PAUSE_DURATION);
        }
    }

}