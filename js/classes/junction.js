class Junction {

    constructor(junction) {
        this.number = junction.number;
        this.objects = junction.objects;
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

    addIdToSolution(id) {
        this.userSolution.push(id);
    }

    addObjectToSolution(object) {
        this.userSolution.push(object.id);
        object.addedToJunctionSolution = true;
    }

    turnOnOnClickListenerForJunctionObjects() {
        for (const key in JUNCTION_OBJECTS) {
            JUNCTION_OBJECTS[key].setOnClickAction()
        }
    }

    turnOffOnClickListenerForJunctionObjects() {
        for (const key in JUNCTION_OBJECTS) {
            JUNCTION_OBJECTS[key].removeOnClickAction()
        }
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

    async executeActions(object) {
        let actions = this.getActionsForObject(object);
        if (!actions)
            return;
        for (const action of actions) {
            await object[action.type](object, action);
        }
    }

    getActionsForObject(object) {
        return JUNCTION.actions[object.id];
    }

}