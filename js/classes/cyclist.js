class Cyclist extends JunctionObject {

    constructor(cyclist) {
        super(cyclist);
        this.layerVisibilityStates = [
            document.getElementById("cyclist-1"),
            document.getElementById("cyclist-2")
        ];
        this.setVisibilityLayerStates(DEFAULT_LAYERS_VISIBILITY_STATES_DOUBLE);
    }

}