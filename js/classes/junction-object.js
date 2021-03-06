class JunctionObject {

    constructor(object) {
        this.id = object.id;
        this.layer = document.getElementById(object.layer || LAYERS[object.id]);
        this.layer.style.transformOrigin = DEFAULT_TRANSFORM_ORIGINS[object.fileName || object.type.toLowerCase()];

        this.transformX = DEFAULT_POSITION.x;
        this.transformY = DEFAULT_POSITION.y;
        this.angle = DEFAULT_ANGLE;
        this.setDefaultPosition(object.position, object.angle);

        this.addedToJunctionSolution = false;

        this._listener = () => this.handleClick(object);
        this.setOnClickAction();
        this.sleep = (ms) => new Promise(resolve => {
            this.timeout = setTimeout(resolve, ms);
        });
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
        let junctionObject = JUNCTION_OBJECTS[object.id];
        JUNCTION.addObjectToSolution(junctionObject);
        if (!JUNCTION.isObjectPartOfSimultaneousPassage(junctionObject) && !JUNCTION.isWaitingForSimultaneousPassage) {
            this.handleBasicSituation(junctionObject);
        } else if (!JUNCTION.isWaitingForSimultaneousPassage) {
            this.handleFirstObjectOfSimultaneousPassage(junctionObject);
        } else {
            this.handleSecondObjectOfSimultaneousPassage(junctionObject);
        }
    }

    handleBasicSituation(object) {
        JUNCTION.turnOffOnClickListenerForJunctionObjects();
            JUNCTION.executeActions(object)
            .then(() => {
                JUNCTION.checkSolution()
                JUNCTION.turnOnOnClickListenerForJunctionObjects()
            });
    }

    handleFirstObjectOfSimultaneousPassage(object) {
        object.removeOnClickAction();
        JUNCTION.setSimultaneousPassage(object);
        showSimultaneousPassageHint();
    }

    handleSecondObjectOfSimultaneousPassage(object) {
        JUNCTION.turnOffOnClickListenerForJunctionObjects();

        if (this.isCurrentlyAddedObjectCausingCrash(object)) {
            JUNCTION.handleCrashSolution();
            return;
        }

        let firstObjectPromise = JUNCTION.executeActions(JUNCTION_OBJECTS[JUNCTION.simultaneousPassageObjectId]);
        let secondObjectPromise = JUNCTION.executeActions(object);

        $.when( firstObjectPromise, secondObjectPromise ).done(function() {
            JUNCTION.turnOnOnClickListenerForJunctionObjects();
            JUNCTION.clearSimultaneousPassage();
            JUNCTION.checkSolution();
        });
    }

    setOnClickAction() {
        if (!this.addedToJunctionSolution) {
            this.layer.addEventListener('click', this._listener);
            this.layer.style.cursor = "hand";
            this.layer.style.cursor = "pointer";
        }
    }

    removeOnClickAction() {
        this.layer.removeEventListener('click', this._listener);
        this.layer.style.cursor = "auto";
    }

    async moveObjectBasedOnAction(object, action) {
        let distance = action.distance;
        let dir_vec = DIRECTIONS_VECTOR[action.direction];

        for(let i = 0; i < distance; i++) {
            object.moveRelative(dir_vec[0], dir_vec[1]);
            await this.sleep(STRAIGHT_ANIMATION_PAUSE_DURATION);
        }
    }

    async moveObjectBasedOnActionWithAnimation(object, action) {
        let distance = action.distance;
        let dir_vec = DIRECTIONS_VECTOR[action.direction];
        let switched = false;

        for(let i = 0; i < distance; i++) {
            object.moveRelative(dir_vec[0], dir_vec[1]);
            switched = this.switchLayersVisibility(i, switched);
            await this.sleep(STRAIGHT_ANIMATION_PAUSE_DURATION);
        }
    }

    async moveObjectBasedOnActionWithTrafficLight(object, action) {
        await this.moveObjectBasedOnAction(object, action);
        let deferreds = [];
        action.trafficLightActions.forEach(trafficLightAction => {
            deferreds.push(JUNCTION_OBJECTS[trafficLightAction.trafficLightId][trafficLightAction.trafficLightAction]());
        });
        await $.when.apply(null, deferreds).done(function() { });
    }

    switchLayersVisibility(increment, switched) {
        if (increment % SVG_LAYER_SWITCHING_DURATION === 0) {
            if (switched)
                this.setVisibilityLayerStates(DEFAULT_LAYERS_VISIBILITY_STATES_DOUBLE);
            else
                this.setVisibilityLayerStates(ALTERNATIVE_LAYERS_VISIBILITY_STATES_DOUBLE);
            return !switched;
        }
        return switched;
    }

    isCurrentlyAddedObjectCausingCrash(object) {
        return JUNCTION.getPartnerForSimultaneousPassage(object).id !== JUNCTION.simultaneousPassageObjectId;
    }

    clearObjectRoutine() {
        clearTimeout(this.timeout);
    }

}