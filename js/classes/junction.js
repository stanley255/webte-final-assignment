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
        return solution1.length === solution2.length && solution1.every((value, index) => { return value === solution2[index]});
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
        // TODO - implement actions execution
        console.log(car.color + " car executing these actions: ", actions);
    }

    getCarActions(car) {
        return JUNCTION.actions[car.color];
    }

}