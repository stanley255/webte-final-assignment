class JunctionObject {

    constructor(object) {
        this.id = object.id;
        this.layer = document.getElementById(LAYERS[object.id]);
        this._listener = () => this.handleClick(object);
        this.setOnClickAction();
    }

    handleClick(object) {
        JUNCTION.turnOffOnClickListenerForJunctionObjects();
        JUNCTION.addObjectToSolution(JUNCTION_OBJECTS[object.id]);
        JUNCTION.executeActions(JUNCTION_OBJECTS[object.id])
            .then(() => {
                JUNCTION.checkSolution()
                JUNCTION.turnOnOnClickListenerForJunctionObjects()
            });
    }

    setOnClickAction() {
        this.layer.addEventListener('click', this._listener);
    }

    removeOnClickAction() {
        this.layer.removeEventListener('click', this._listener);
    }

}