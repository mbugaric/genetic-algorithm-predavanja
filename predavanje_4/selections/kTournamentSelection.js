function kTournamentSelection(population,K) {

    let newPopulation = new Array;

    for(let br=0; br<population.length; br++)
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


function kTournamentSelectionWithDebug(population,K) {

    let newPopulation = new Array;

    for(let br=0; br<population.length; br++)
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
        }, 2000*br);
    }

    return newPopulation;
}