class Junction {

    constructor(junction) {
        this.number = junction.number;
        this.cars = junction.cars;
        this.solutions = junction.solutions;
        this.userSolution = [];
        this.solved = false;
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
        alert("✔✔✔");
    }

    junctionNotSolved() {
        this.solved = false;
        alert("❌❌❌");
    }

    allowToWatchDemo() {
        enableDemoButton();
    }

}