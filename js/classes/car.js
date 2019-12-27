class Car {

    constructor(car) {
        this.color = car.color.toLowerCase();
        this.carOff = document.getElementById(this.color + BLINKER_OFF);
        this.carRight = document.getElementById(this.color + BLINKER_RIGHT);
        this.carLeft = document.getElementById(this.color + BLINKER_LEFT);

        this.layer = document.getElementById(LAYERS[this.color]);
        this.layer.style.transformOrigin = DEFAULT_TRANSFORM_ORIGIN;
        this.transformX = DEFAULT_POSITION.x;
        this.transformY = DEFAULT_POSITION.y;
        this.angle = DEFAULT_ANGLE;

        this.setDefaultPosition(car.position, car.angle);
        this.setDefaultBlinkers(car.blinker);

        this.setOnClickActionToAllBlinkerStates(car);
    }

    setDefaultPosition(position = DEFAULT_POSITION, angle = DEFAULT_ANGLE) {
        this.moveAbsolute(position.x, position.y);
        this.rotateAbsolute(angle);
    }

    setDefaultBlinkers(blinker = DEFAULT_BLINKER_STATE) {
        BLINKERS[blinker](this);
    }

    setOnClickActionToAllBlinkerStates(car) {
        CAR_BLINKER_STATES.forEach(state => {
            this[state].addEventListener('click', function () {
                JUNCTION.executeCarActions(CARS[car.color]);
                JUNCTION.addCarToSolution(CARS[car.color]);
                JUNCTION.checkSolution();
            });
        });
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

}