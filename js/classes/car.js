const BLINKER_OFF = "-car-blinker-off";
const BLINKER_RIGHT = "-car-blinker-right";
const BLINKER_LEFT = "-car-blinker-left";

class Car {

    constructor(color) {
        this.color = color.toLowerCase();
        this.carOff = document.getElementById(this.color + BLINKER_OFF);
        this.carRight = document.getElementById(this.color + BLINKER_RIGHT);
        this.carLeft = document.getElementById(this.color + BLINKER_LEFT);
        this.transformX = 0;
        this.transformY = 0;
        this.angle = 0;
        this.layer = document.getElementById("layer1");
        this.layer.style.transformOrigin = "42px 84px";

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