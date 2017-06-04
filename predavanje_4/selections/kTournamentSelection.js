function kTournamentSelection(population, N, K) {

    let newPopulation = new Array;

    for(let br=0; br<N; br++)
    {
        let ids = generateUniqueRandomFromInteger(K, 0, population.length-1);
        let tempTournament=new Array();
        ids.map((value)=>{
            tempTournament.push(population[value])
        })
        let fittest = returnNLargest(tempTournament,1)[0];
        newPopulation.push(fittest)
    }

    return newPopulation;
}


function kTournamentSelectionWithDebug(population,N, K) {
    return new Promise((resolve, reject) => {
        let newPopulation = new Array;
        var cntr=0;
        for(let br=0; br< N; br++)
        {
            setTimeout(function () {
                $("#results").append("<br /><span class=\"small\">Runda "+(br+1)+": </span>");
                let ids = generateUniqueRandomFromInteger(K, 0, population.length-1);
                let tempTournament=new Array();
                let textIndividuals = '';
                ids.map((value)=>{
                    tempTournament.push(population[value])
                    textIndividuals += "(" + population[value].fitness + ") - ";
                })
                let fittest = returnNLargest(tempTournament,1)[0];
                $("#results").append(textIndividuals+" pobjednik " + fittest.fitness);
                newPopulation.push(fittest)
                if(cntr==N-1)
                {
                    console.log("Winners", newPopulation)
                    resolve(newPopulation);
                }
                cntr++;
            }, 2000*br);
        }    
    });
}