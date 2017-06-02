function simpleTournamentSelection(population) {

    let newPopulation = new Array;

    while (population.length > 1) {
        let tempId = Math.floor(Math.random() * (population.length - 1));
        let individual1 = population.splice(tempId, 1)[0];
        tempId = Math.floor(Math.random() * (population.length - 1));
        let individual2 = population.splice(tempId, 1)[0];
        newPopulation.push(individual1.fitness > individual2.fitness ? individual1 : individual2);
    }
    return newPopulation;
}


function simpleTournamentSelectionWithDebug(population) {

    let newPopulation = new Array;

    for(br=0; br < population.length/2; br++)
    { 
        setTimeout(function () {
            let ind1 = '', ind2 = '', winner = '';
            let tempId = Math.floor(Math.random() * (population.length - 1));
            let individual1 = population.splice(tempId, 1)[0];
            tempId = Math.floor(Math.random() * (population.length - 1));
            let individual2 = population.splice(tempId, 1)[0];
            ind1 = "(" + individual1.fitness + ")";
            ind2 = "(" + individual2.fitness + ")";
            winner = individual1.fitness > individual2.fitness ? "(" + individual1.fitness + ")" : "(" + individual2.fitness + ")"
            newPopulation.push(individual1.fitness > individual2.fitness ? individual1 : individual2);
            $("#results").append("<br /><span class=\"small\">" + ind1 + " vs. " + ind2 + " - pobjednik je " + winner + "</span>");
            
        }, 2000*br);

    }

    return newPopulation;
}