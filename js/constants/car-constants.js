const BLINKER_OFF = "-car-blinker-off";
const BLINKER_RIGHT = "-car-blinker-right";
const BLINKER_LEFT = "-car-blinker-left";

const LAYERS = {
    blue: "layer1",
    green: "layer2",
    red: "layer3"
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

const CAR_BLINKER_STATES = [
    "carOff",
    "carRight",
    "carLeft"
]

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

