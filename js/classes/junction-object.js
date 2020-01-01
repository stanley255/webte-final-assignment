class JunctionObject {

    constructor(object) {
        this.id = object.id;
        this.layer = document.getElementById(LAYERS[object.id]);
        this.layer.style.transformOrigin = DEFAULT_TRANSFORM_ORIGINS[object.type.toLowerCase()];

        this.transformX = DEFAULT_POSITION.x;
        this.transformY = DEFAULT_POSITION.y;
        this.angle = DEFAULT_ANGLE;
        this.setDefaultPosition(object.position, object.angle);

        this.addedToJunctionSolution = false;

        this._listener = () => this.handleClick(object);
        this.setOnClickAction();
    }

    setDefaultPosition(position = DEFAULT_POSITION, angle = DEFAULT_ANGLE) {
        this.moveAbsolute(position.x, position.y);
        this.rotateAbsolute(angle);
    }

    moveRelative(a, b) {
        this.transformX += a;
        this.transformY += b;
        this.updateObject();
    }

    moveAbsolute(x, y) {
        this.transformX = x;
        this.transformY = y;
        this.updateObject();
    }

    rotateRelative(angle) {
        this.angle += angle;
        this.updateObject();
    }

    rotateAbsolute(angle) {
        this.angle = angle;
        this.updateObject();
    }

    updateObject() {
        $(this.layer).attr("transform", "translate(" + this.transformX + "," + this.transformY + ") rotate(" + this.angle + ")");
    }

    setVisibilityLayerStates(states) {
        if (!(this.layerVisibilityStates) || (this.layerVisibilityStates.length !== states.length))
            return;
        states.forEach((state, i) => {
            this.layerVisibilityStates[i].style.visibility = state;
        });
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
        if (!this.addedToJunctionSolution)
            this.layer.addEventListener('click', this._listener);
    }

    removeOnClickAction() {
        this.layer.removeEventListener('click', this._listener);
    }

    sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async moveObjectBasedOnAction(object, action) {
        let distance = action.distance;
        let dir_vec = DIRECTIONS_VECTOR[action.direction];

        for(let i = 0; i < distance; i++) {
            object.moveRelative(dir_vec[0], dir_vec[1]);
            await this.sleep(STRIAGHT_ANIMATION_PAUSE_DURATION);
        }
    }

    async moveObjectBasedOnActionWithAnimation(object, action) {
        let distance = action.distance;
        let dir_vec = DIRECTIONS_VECTOR[action.direction];
        let switched = false;

        for(let i = 0; i < distance; i++) {
            object.moveRelative(dir_vec[0], dir_vec[1]);
            switched = this.switchLayersVisibility(i, switched);
            await this.sleep(STRIAGHT_ANIMATION_PAUSE_DURATION);
        }
    }

    switchLayersVisibility(i, switched) {
        if (i%SVG_LAYER_SWITCHING_DURATION === 0) {
            if (switched)
                this.setVisibilityLayerStates(["visible", "hidden"]);
            else
                this.setVisibilityLayerStates(["hidden", "visible"]);
            return !switched;
        }
        return switched;
    }

}