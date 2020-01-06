class TrafficLight extends JunctionObject {

    constructor(trafficLight) {
        super(trafficLight);
        this.layerVisibilityStates = [
            document.getElementById("red-light-" + trafficLight.layerSuffixId),
            document.getElementById("yellow-light-" + trafficLight.layerSuffixId),
            document.getElementById("green-light-" + trafficLight.layerSuffixId)
        ];
        LIGHTS[trafficLight.light](this);
        this.currentLight = trafficLight.light;
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

    handleClick() {}

    setOnClickAction() {}

    removeOnClickAction() {}

    async switchTrafficLightToRed() {
        this.setYellowLight();
        await this.sleep(TRAFFIC_LIGHT_COLOR_SWITCHING_DURATION);
        this.setRedLight();
        await this.sleep(TRAFFIC_LIGHT_COLOR_SWITCHING_DURATION);
    }
    
    async switchTrafficLightToGreen() {
        this.setYellowLight();
        await this.sleep(TRAFFIC_LIGHT_COLOR_SWITCHING_DURATION);
        this.setGreenLight();
        await this.sleep(TRAFFIC_LIGHT_COLOR_SWITCHING_DURATION);
    }

}