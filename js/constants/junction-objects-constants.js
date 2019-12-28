const BLINKER_OFF = "-car-blinker-off";
const BLINKER_RIGHT = "-car-blinker-right";
const BLINKER_LEFT = "-car-blinker-left";

const LAYERS = {
    car01: "layer1",
    car02: "layer2",
    car03: "layer3",
    pedestrian01: "pedestrian-layer"
}

const BLINKERS = {
    off: function (car) {
        car.turnOffBlinkers()
    },
    right: function (car) {
        car.turnOnRightBlinker()
    },
    left: function (car) {
        car.turnOnLeftBlinker()
    }
}

const DEFAULT_TRANSFORM_ORIGIN = "42px 84px";
const DEFAULT_POSITION = {x: 0, y: 0};
const DEFAULT_ANGLE = 0;

const DEFAULT_BLINKER_STATE = "off";

const CAR_HALF_WIDTH = 40;

const DIRECTIONS_VECTOR = {
    up:     [ 0, -1],
    right:  [ 1,  0],
    down:   [ 0,  1],
    left:   [-1,  0]
}

const TURN_ANIMATION_PAUSE_DURATION = 20;
const STRIAGHT_ANIMATION_PAUSE_DURATION = 5;