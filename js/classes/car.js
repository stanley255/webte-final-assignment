const BLINKER_OFF = "-car-blinker-off";
const BLINKER_RIGHT = "-car-blinker-right";
const BLINKER_LEFT = "-car-blinker-left";

const LAYERS = {
    blue: "layer1",
    green: "layer2",
    red: "layer3"
}

const DEFAULT_TRANSFORM_ORIGIN = "42px 84px";

class Car {

    constructor(color, position, angle) {
        this.color = color.toLowerCase();
        this.carOff = document.getElementById(this.color + BLINKER_OFF);
        this.carRight = document.getElementById(this.color + BLINKER_RIGHT);
        this.carLeft = document.getElementById(this.color + BLINKER_LEFT);

        this.layer = document.getElementById(LAYERS[color]);
        this.layer.style.transformOrigin = DEFAULT_TRANSFORM_ORIGIN;
        this.transformX = 0;
        this.transformY = 0;
        this.angle = 0;

        this.moveAbsolute(position.x, position.y);
        this.rotateAbsolute(angle);

        this.carOff.addEventListener('click', function(){
            JUNCTION.addCarToSolution(CARS[color]);
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