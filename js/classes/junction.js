class Junction {

    constructor(junction) {
        this.number = junction.number;
        this.cars = junction.cars;
        this.solutions = junction.solutions;
        this.userSolution = [];
        this.solved = false;
        this.actions = junction.actions;
        this.setSolution(junction);
    }

    setSolution(junction) {
        $(JUNCTION_SOLUTION_TITLE_ID).html(junction.title);
        $(JUNCTION_SOLUTION_TEXT_ID).html(junction.solutionText);
    }

    addCarColorToSolution(carColor) {
        this.userSolution.push(carColor);
    }

    addCarToSolution(car) {
        this.userSolution.push(car.color);
    }

    checkSolution() {
        if (this.userSolution.length !== this.solutions[0].length)
            return;
        if (this.isUserSolutionValid())
            this.junctionSolved()
        else
            this.junctionNotSolved()
        this.allowToWatchDemo();
        this.allowToShowSolution();
    }

    isUserSolutionValid() {
        for (const correctSolution of this.solutions) {
            if (this.compareSolutions(correctSolution, this.userSolution))
                return true;
        }
        return false;
    }

    compareSolutions(solution1, solution2) {
        return solution1.length === solution2.length && solution1.every((value, index) => {
            return value === solution2[index]
        });
    }

    junctionSolved() {
        this.solved = true;
        showCorrectAnswerPopUp();
    }

    junctionNotSolved() {
        this.solved = false;
        showIncorrectAnswerPopUp();
    }

    allowToWatchDemo() {
        enableDemoButton();
    }

    allowToShowSolution() {
        enableSolutionButton();
    }

    executeCarActions(car) {
        let actions = this.getCarActions(car);
        console.log(car.color + " car executing these actions: ", actions); // TODO - remove

        actions.forEach(action => {
            if (action.type.toLowerCase() === "turn") {
                this.turnCarBasedOnAction(car, action);
            } else {
                // TODO
                console.log(car.color + " is moving!");
            }
        });

    }

    getCarActions(car) {
        return JUNCTION.actions[car.color];
    }

    async turnCarBasedOnAction(car, action) {
        let TIMEOUT = 20;
        console.log(car.color + " car is turning!");

        let carStartX = car.transformX;
        let carStartY = car.transformY;

        let quadrant = QUADRANTS[action.quadrant][action.clockwise ? "clockwise" : "counterclockwise"];

        for (let i = quadrant.start; i != (quadrant.end + quadrant.increment); i += quadrant.increment) {
            this.turnCar(car, i, action.distance, carStartX, carStartY, quadrant);
            await new Promise(r => setTimeout(r, TIMEOUT));
        }

    }

    turnCar(car, angle, distance, startX, startY, quadrant) {
        var centerX = startX + quadrant.vector[0] * CAR_HALF_WIDTH + quadrant.vector[1] * distance;
        var centerY = startY + quadrant.vector[2] * CAR_HALF_WIDTH + quadrant.vector[3] * distance;
        var x = centerX + Math.cos(-angle * Math.PI / 180) * (distance + CAR_HALF_WIDTH);
        var y = centerY + Math.sin(-angle * Math.PI / 180) * (distance + CAR_HALF_WIDTH);
        car.moveAbsolute(x, y);
        car.rotateAbsolute(quadrant.baseAngle + -1 * angle);
    }

}