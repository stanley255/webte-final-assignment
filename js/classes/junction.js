class Junction {

    constructor(junction) {
        this.number = junction.number;
        this.cars = junction.cars;
        this.solutions = junction.solutions;
        this.userSolution = [];

    }

    addCarColorToSolution(carColor) {
        this.userSolution.push(carColor);
    }

    addCarToSolution(car) {
        this.userSolution.push(car.color);
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

}