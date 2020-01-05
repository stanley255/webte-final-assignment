class Pedestrian extends JunctionObject {

    constructor(pedestrian) {
        super(pedestrian);
        this.layerVisibilityStates = [
            document.getElementById("pedestrian-1"),
            document.getElementById("pedestrian-2")
        ];
        this.setVisibilityLayerStates(DEFAULT_LAYERS_VISIBILITY_STATES_DOUBLE);
    }

}