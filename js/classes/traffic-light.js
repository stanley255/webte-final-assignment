class TrafficLight extends JunctionObject {

    constructor(trafficLight) {
        super(trafficLight);
        this.layerVisibilityStates = [
            document.getElementById("red-light-" + trafficLight.layerSuffixId),
            document.getElementById("yellow-light-" + trafficLight.layerSuffixId),
            document.getElementById("green-light-" + trafficLight.layerSuffixId)
        ];
        LIGHTS[trafficLight.light](this);
    }

    setGreenLight() {
        this.setVisibilityLayerStates(["hidden", "hidden", "visible"]);
    }

    setYellowLight() {
        this.setVisibilityLayerStates(["hidden", "visible", "hidden"]);
    }

    setRedLight() {
        this.setVisibilityLayerStates(["visible", "hidden", "hidden"]);
    }

}