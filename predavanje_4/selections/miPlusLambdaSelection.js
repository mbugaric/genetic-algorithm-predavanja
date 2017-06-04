function miPlusLambdaSelection(population, MI, LAMBDA) {
    let newPopulation = new Array();
    if(population.length%MI==0){
        let tempChildren = new Array();

        for(let br=0; br < population.length/MI; br++){
            let miParents=new Array();
            generateUniqueRandomFromInteger(MI,0,population.length-1).map((value)=>{
                miParents.push(population[value]);
            })
            tempChildren.push( crossoverWithLAMBDA(miParents, MI, LAMBDA) )
        }

        tempChildren.map((collection)=>{
            collection.map((individual)=>{
                newPopulation.push(individual);
            })
        })
    }
    else{
        console.log("ERROR")
    }
    return newPopulation;
}

function crossoverWithLAMBDA(miPopulation, MI, LAMBDA) {

    tempPopulation = new Array();

    for (var br = 0; br < LAMBDA; br++) {
        ind1 = Math.floor(Math.random() * miPopulation.length);
        do {
            ind2 = Math.floor(Math.random() * miPopulation.length);
        } while (ind1 == ind2);

        if (Math.random() <= CROSSOVER_PROBABILITY) { 
            //Could be midpoint, or random point along that line
            const r = Math.random();
            const newX = miPopulation[ind1].x + (miPopulation[ind2].x - miPopulation[ind1].x) * r;
            const newY = miPopulation[ind1].y + (miPopulation[ind2].y - miPopulation[ind1].y) * r;

            estimatedFitnessMin = miPopulation[ind1].fitness <= miPopulation[ind2].fitness ? population[ind1].fitness : population[ind2].fitness;
            estimatedFitnessMax = miPopulation[ind1].fitness <= population[ind2].fitness ? population[ind2].fitness : population[ind1].fitness;
            
            let tempPosition = {
                x: Math.floor(newX),
                y: Math.floor(newY),
                fitness: ((estimatedFitnessMax-estimatedFitnessMin)/2)+estimatedFitnessMin
            }
            tempPopulation.push(tempPosition);
        }
        else { //Crossover not used, send one parent to next generation
                //Send first parent (it was randomly chosen) to a new generation
                tempPopulation.push(miPopulation[ind1]);
            }
    }

    //Add parents as well, before selecting N best
    for (var br = 0; br < MI; br++) {
        tempPopulation.push(miPopulation[br])
    }

    newPopulation = new Array();
    newPopulation = returnNLargest(tempPopulation,MI);    
    
    return newPopulation;
}


function miPlusLambdaSelectionWithDebug(population, MI, LAMBDA) {
   $("#results").append("<br /><b>Mi: "+MI+", LAMBDA: "+LAMBDA+"</b>");
   
   let newPopulation = new Array();
    if(population.length%MI==0){
        let tempChildren = new Array();

        for(let br=0; br < population.length/MI; br++){
            $("#results").append("<br />Iteracija " + (br+1) +": ");
            let miParents=new Array();
            generateUniqueRandomFromInteger(MI,0,population.length-1).map((value)=>{
                miParents.push(population[value]);
            })
            
            tempChildren.push( crossoverWithLAMBDAWithDebug(miParents, MI, LAMBDA) )
        }

        let newText='';
        tempChildren.map((collection)=>{
            collection.map((individual)=>{
                newText+=" ("+individual.fitness+"), ";
                newPopulation.push(individual);
            })
        })
        $("#results").append("<br />Chosen: " + newText);
    }
    else
    {
        console.log("ERROR")
    }

    console.log("Finished with population", newPopulation);
    return newPopulation;
}




function crossoverWithLAMBDAWithDebug(miPopulation, MI, LAMBDA) {

    console.log(MI+" parents randomly selected", miPopulation)

    tempPopulation = new Array();
    var text = '';

    for (var br = 0; br < LAMBDA; br++) {
        ind1 = Math.floor(Math.random() * miPopulation.length);
        do {
            ind2 = Math.floor(Math.random() * miPopulation.length);
        } while (ind1 == ind2);

        if (Math.random() <= CROSSOVER_PROBABILITY) { 
            //Could be midpoint, or random point along that line
            const r = Math.random();
            const newX = miPopulation[ind1].x + (miPopulation[ind2].x - miPopulation[ind1].x) * r;
            const newY = miPopulation[ind1].y + (miPopulation[ind2].y - miPopulation[ind1].y) * r;

            estimatedFitnessMin = miPopulation[ind1].fitness <= miPopulation[ind2].fitness ? population[ind1].fitness : population[ind2].fitness;
            estimatedFitnessMax = miPopulation[ind1].fitness <= population[ind2].fitness ? population[ind2].fitness : population[ind1].fitness;
            
            let tempPosition = {
                x: Math.floor(newX),
                y: Math.floor(newY),
                fitness: ((estimatedFitnessMax-estimatedFitnessMin)/2)+estimatedFitnessMin
            }
            tempPopulation.push(tempPosition);
            text+=' <span style="color:gray" >('+tempPosition.fitness+")</span>,"
        }
        else { //Crossover not used, send one parent to next generation
                //Send first parent (it was randomly chosen) to a new generation
                tempPopulation.push(miPopulation[ind1]);
                text+=' <span style="color:blue" >('+miPopulation[ind1].fitness+")</span>,"
            }
    }

    console.log("Generated "+LAMBDA+" children", tempPopulation);

    //Add parents as well, before selecting N best in this iteration
    var parentsText='';
    for (var br = 0; br < MI; br++) {
        parentsText+="("+miPopulation[br].fitness+"), ";
        tempPopulation.push(miPopulation[br])
    }
    $("#results").append(parentsText);

    newPopulation = new Array();
    newPopulation = returnNLargest(tempPopulation,MI);    

    console.log("Chose " + MI + " best among parents and children", newPopulation )
    
    $("#results").append(text);
    return newPopulation;
}

