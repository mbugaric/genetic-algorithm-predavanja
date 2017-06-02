function simplePropSelection(population, N) {
    let sum = fitnessSum(population);
    let newPopulation = new Array();

    let q = new Array();
    population.map((individual, index) => {
        q.push((individual.fitness / sum) + (q[index - 1] || 0));
    });

    for (let i = 0; i < N; i++) {
        let found = false;
        let r = Math.random();
        q.map((value, index) => {
            if (r < value && !found) {
                found = true;
                let foundIndex = index;
                newPopulation.push(population[foundIndex])
            }
        })
    }
    return newPopulation;
}


function simplePropSelectionWithDebug(population, N) {
    $("#results").append(" - ");
    let sum = fitnessSum(population);
    let newPopulation = new Array();

    let q = new Array();
    population.map((individual, index) => {
        q.push((individual.fitness / sum) + (q[index - 1] || 0));
    });

    console.log(q);
    for (let i = 0; i < N; i++) {
        setTimeout(function () {
            let found = false;
            let r = Math.random();
            q.map((value, index) => {
                if (r < value && !found) {
                    found = true;
                    let foundIndex = index;
                    newPopulation.push(population[foundIndex])
                    console.log("Generated random number " + r + " and choose " + population[foundIndex].fitness);
                    $("#fitness_"+curr_gen+"_"+(foundIndex+1)).addClass("selectedFitness");
                    $("#results").append("<span>("+population[foundIndex].fitness+")</span>&nbsp");
                }
            })
            
        }, 2000*i);
    }
    return newPopulation;
}