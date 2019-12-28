class Pedestrian extends JunctionObject {

    constructor(pedestrian) {
        super(pedestrian);
        this.setOnClickAction();
    }

    setOnClickAction() {
        this.layer.addEventListener('click', this._listener);
    }

    removeOnClickAction() {
        this.layer.removeEventListener('click', this._listener);
    }

}