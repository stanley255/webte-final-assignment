// General purpose constants
const LAYERS = {
    car01: "layer1",
    car02: "layer2",
    car03: "layer3",
    pedestrian01: "pedestrian-layer",
    cyclist01: "cyclist-layer",
    tram01: "tram-layer"
}

const COLORS = {
    car01: "blue",
    car02: "green",
    car03: "red"
}

const DEFAULT_TRANSFORM_ORIGINS = {
    car: "42px 84px",
    pedestrian: "23px 23.5px",
    cyclist: "22px 42.5px",
    tram: "48.5px 310px",
    trafficlight1: "16.5px 52px",
    trafficlight2: "23.5px 52px"
}


const DEFAULT_POSITION = {x: 0, y: 0};
const DEFAULT_ANGLE = 0;

const DIRECTIONS_VECTOR = {
    up:         [ 0, -1],
    right:      [ 1,  0],
    down:       [ 0,  1],
    left:       [-1,  0]
}

const TURN_ANIMATION_PAUSE_DURATION = 20;
const STRAIGHT_ANIMATION_PAUSE_DURATION = 5;
const BLINKER_LAYER_SWITCHING_DURATION = 600;
const SVG_LAYER_SWITCHING_DURATION = 35;
const TRAFFIC_LIGHT_COLOR_SWITCHING_DURATION = 450;

// Constants for cars
const BLINKER_OFF = "-car-blinker-off";
const BLINKER_RIGHT = "-car-blinker-right";
const BLINKER_LEFT = "-car-blinker-left";

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

const DEFAULT_BLINKER_STATE = "off";

const CAR_HALF_WIDTH = 40;

// Constants for pedestrian & cyclist
const DEFAULT_LAYERS_VISIBILITY_STATES_DOUBLE = ["visible", "hidden"];
const ALTERNATIVE_LAYERS_VISIBILITY_STATES_DOUBLE = ["hidden", "visible"];

// Constants for traffic light
const DEFAULT_LAYERS_VISIBILITY_STATES_TRIPPLE = ["visible", "hidden", "hidden"];

const LIGHTS = {
    red: function (trafficLight) {
        trafficLight.setRedLight()
    },
    yellow: function (trafficLight) {
        trafficLight.setYellowLight()
    },
    green: function (trafficLight) {
        trafficLight.setGreenLight()
    }
}