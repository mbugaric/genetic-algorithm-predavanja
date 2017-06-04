function simpleTournamentSelection(population) {

    let tempPopulation = new Array;
    let newPopulation = new Array;

    while (population.length > 1) {
        let tempId = Math.floor(Math.random() * (population.length - 1));
        let individual1 = population.splice(tempId, 1)[0];
        tempId = Math.floor(Math.random() * (population.length - 1));
        let individual2 = population.splice(tempId, 1)[0];
        tempPopulation.push(individual1.fitness > individual2.fitness ? individual1 : individual2);
    }

    newPopulation = crossover(tempPopulation);

    return newPopulation;
}


function simpleTournamentSelectionWithDebug(population) {
    return new Promise((resolve, reject) => {
        let tempPopulation = new Array;
        let newPopulation = new Array;

        var cntr=0;
        for (br = 0; br < VEL_POP / 2; br++) {
            setTimeout(function () {
                let ind1 = '', ind2 = '', winner = '';
                let tempId = Math.floor(Math.random() * (population.length - 1));
                let individual1 = population.splice(tempId, 1)[0];
                tempId = Math.floor(Math.random() * (population.length - 1));
                let individual2 = population.splice(tempId, 1)[0];
                ind1 = "(" + individual1.fitness + ")";
                ind2 = "(" + individual2.fitness + ")";
                winner = individual1.fitness > individual2.fitness ? "(" + individual1.fitness + ")" : "(" + individual2.fitness + ")"
                tempPopulation.push(individual1.fitness > individual2.fitness ? individual1 : individual2);
                $("#results").append("<br /><span class=\"small\">" + ind1 + " vs. " + ind2 + " - pobjednik je " + winner + "</span>");
                console.log( ind1 + " vs. " + ind2 + " - winner is " + winner);

                if (cntr == (VEL_POP / 2)-1) {
                    console.log("Winners", tempPopulation)
                    newPopulation = crossover(tempPopulation);
                    console.log("Population after crossover", newPopulation)
                    resolve(newPopulation);
                }
                cntr++;
            }, 2000 * br);

        }
    })
}


function crossover(tempPopulationForCrossOver) { 
        newPopulation = new Array();
        for(var br=0; br<tempPopulationForCrossOver.length; br++)
        {
            newPopulation.push(tempPopulationForCrossOver[br])
        }
        for (var br = 0; br < VEL_POP/2;  br++) { 
            //Choose indexes of two unique individuals from tempPopulationForCrossOver
            ind1 = Math.floor(Math.random() * tempPopulationForCrossOver.length);
            do {
                ind2 = Math.floor(Math.random() * tempPopulationForCrossOver.length);
            } while (ind1 == ind2);

            if (Math.random() <= CROSSOVER_PROBABILITY) {
                //Could be midpoint, or random point along that line
                const r = Math.random();
                const newX = tempPopulationForCrossOver[ind1].x + (tempPopulationForCrossOver[ind2].x - tempPopulationForCrossOver[ind1].x) * r;
                const newY = tempPopulationForCrossOver[ind1].y + (tempPopulationForCrossOver[ind2].y - tempPopulationForCrossOver[ind1].y) * r;

                let tempPosition = {
                    x: Math.floor(newX),
                    y: Math.floor(newY),
                    fitness: "n/a",
                }
                newPopulation.push(tempPosition);
                console.log("Crossover reproducing a new child", tempPosition)
            }
            else { //Crossover not used, send one parent to next generation
                //Send first parent (it was randomly chosen) to a new generation
                newPopulation.push(tempPopulationForCrossOver[ind1]);
                console.log("Passing parent to new generation",tempPopulationForCrossOver[ind1])
            }
        }
        return newPopulation;
    }