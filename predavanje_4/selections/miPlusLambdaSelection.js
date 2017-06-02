function miPlusLambdaSelection(population, MI, LAMBDA) {
    let newPopulation = new Array();
    if(population.length%MI==0)
    {
        let tempChildren = new Array();

        for(let br=0; br < population.length/MI; br++)
        {
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
    else
    {
        console.log("ERROR")
    }
    return newPopulation;
}


function crossoverWithLAMBDA(population, MI, LAMBDA) {

    tempPopulation = new Array();
    individualsForSelection = population.length;

    for (var br = 0; br < individualsForSelection; br++) {
        tempPopulation[br] = population[br];
    }

    
    for (var br = individualsForSelection; br < individualsForSelection+LAMBDA; br++) {
        if (br < 2) {
            let tempPosition = {
                x: Math.floor(Math.random() * 120),
                y: Math.floor(Math.random() * 60) + 410,
                fitness: 0
            }
            console.log("Not enough data for crossover - generating random individual");
        }
        else {
            ind1 = Math.floor(Math.random() * individualsForSelection);
            do {
                ind2 = Math.floor(Math.random() * individualsForSelection);
            } while (ind1 == ind2);
            
            let minX = population[ind1].x <= population[ind2].x ? population[ind1].x : population[ind2].x;
            let maxX = population[ind1].x <= population[ind2].x ? population[ind2].x : population[ind1].x;
            let minY = population[ind1].y <= population[ind2].y ? population[ind1].y : population[ind2].y;
            let maxY = population[ind1].y <= population[ind2].y ? population[ind2].y : population[ind1].y;
            //Here we use ESTIMATE 
            // In real usage, we would have to EVALUATE
            estimatedFitnessMin = population[ind1].fitness <= population[ind2].fitness ? population[ind1].fitness : population[ind2].fitness;
            estimatedFitnessMax = population[ind1].fitness <= population[ind2].fitness ? population[ind2].fitness : population[ind1].fitness;
            

            let tempPosition = {
                x: randomIntFromInterval(minX, maxX),
                y: randomIntFromInterval(minY, maxY),
                fitness: ((estimatedFitnessMax-estimatedFitnessMin)/2)+estimatedFitnessMin
            }
            tempPopulation.push(tempPosition);
        }

        newPopulation = new Array();
        newPopulation = returnNLargest(tempPopulation,MI);

    }
    return newPopulation;
}




function miPlusLambdaSelectionWithDebug(population, MI, LAMBDA) {
   $("#results").append("<br /><b>Mi: "+MI+", LAMBDA: "+LAMBDA+"</b>");
   
   let newPopulation = new Array();
    if(population.length%MI==0)
    {
        let tempChildren = new Array();

        for(let br=0; br < population.length/MI; br++)
        {
            $("#results").append("<br />Iteracija " + (br+1) +": ");
            let miParents=new Array();
            var text='';
            generateUniqueRandomFromInteger(MI,0,population.length-1).map((value)=>{
                text+="("+population[value].fitness+"), ";
                miParents.push(population[value]);
            })
            $("#results").append(text);
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
    return newPopulation;
}




function crossoverWithLAMBDAWithDebug(population, MI, LAMBDA) {

    tempPopulation = new Array();
    individualsForSelection = population.length;

    for (var br = 0; br < individualsForSelection; br++) {
        tempPopulation[br] = population[br];
    }

    var text = '';
    for (var br = individualsForSelection; br < individualsForSelection+LAMBDA; br++) {
        console.log(br,"!!!!!")
        
        if (br < 2) {
            let tempPosition = {
                x: Math.floor(Math.random() * 120),
                y: Math.floor(Math.random() * 60) + 410,
                fitness: 0
            }
            console.log("Not enough data for crossover - generating random individual");
        }
        else {
            ind1 = Math.floor(Math.random() * individualsForSelection);
            do {
                ind2 = Math.floor(Math.random() * individualsForSelection);
            } while (ind1 == ind2);
            
            let minX = population[ind1].x <= population[ind2].x ? population[ind1].x : population[ind2].x;
            let maxX = population[ind1].x <= population[ind2].x ? population[ind2].x : population[ind1].x;
            let minY = population[ind1].y <= population[ind2].y ? population[ind1].y : population[ind2].y;
            let maxY = population[ind1].y <= population[ind2].y ? population[ind2].y : population[ind1].y;
            //Here we use ESTIMATE 
            // In real usage, we would have to EVALUATE
            estimatedFitnessMin = population[ind1].fitness <= population[ind2].fitness ? population[ind1].fitness : population[ind2].fitness;
            estimatedFitnessMax = population[ind1].fitness <= population[ind2].fitness ? population[ind2].fitness : population[ind1].fitness;
            

            let tempPosition = {
                x: randomIntFromInterval(minX, maxX),
                y: randomIntFromInterval(minY, maxY),
                fitness: ((estimatedFitnessMax-estimatedFitnessMin)/2)+estimatedFitnessMin
            }
            tempPopulation.push(tempPosition);
            text+=' <span style="color:gray" >('+tempPosition.fitness+")</span>,"
        }

        
        newPopulation = new Array();
        newPopulation = returnNLargest(tempPopulation,MI);

    }
    
    $("#results").append(text);
    return newPopulation;
}