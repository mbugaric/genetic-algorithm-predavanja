/**
 *   SUS(Population, N)
 *   F := total fitness of Population
 *   N := number of offspring to newPopulation
 *   P := distance between the pointers (F/N)
 *   Start := random number between 0 and P
 *   Pointers := [Start + i*P | i in [0..(N-1)]]
 *   return RWS(Population,Pointers)
 * 
 */


function stohUnivSelection(population, N) {
    
    let F = fitnessSum(population);
    let P = F/N;
    
    Start = (Math.random() * P);
    
    ptrs = new Array;

    for (i = 0; i < N ; i++) {
        ptrs.push(Start + i * P);
    }

    let newPopulation = RWS(population, ptrs);

    return newPopulation;
}


/**
 *   RWS(Population, Points)
 *   newPopulation = []
 *   for P in Points
 *       i := 0
 *       while fitness sum of Population[0..i] < P
 *           i++
 *       add Population[i] to newPopulation
 *   return newPopulation
 */

function RWS(population, pointers)
{
     let newPopulation = new Array();
     pointers.map((value)=>{
        let i=0;
        while(fitnessSumToIndex(population,i) < value)
        {
            i++;
        }
        newPopulation.push(population[i]);
     })
     return newPopulation;
}



function stohUnivSelectionWithDebug(population, N) {
    
    let F = fitnessSum(population);
    let P = F/N;
    
    Start = (Math.random() * P);
    ptrs = new Array;

    
    let pointersString = '';
    for (i = 0; i < N ; i++) {
        ptrs.push(Start + i * P);
        pointersString+=Math.round(Start + i * P) +", ";
    }

    console.log("Population", population);
    console.log("Sum of fitness values - " + F);
    console.log("Pointers", pointersString)
    $("#results").append("<br /><span class=\"small\">Značke postavljene na: " + pointersString+"</span><br />");

    let newPopulation = RWSWithDebug(population, ptrs);
    return newPopulation;
}

function RWSWithDebug(population, pointers)
{
     let newPopulation = new Array();
     let write = '<span class="small"> Odabrano: ';
     pointers.map((value)=>{
        let i=0;
        while(fitnessSumToIndex(population,i) < value)
        {
            i++;
        }
        newPopulation.push(population[i]);
        write+=" ("+(population[i].fitness)+")"
        $("#fitness_"+curr_gen+"_"+(i+1)).addClass("selectedFitness");
     })
     write += '</span>';
     $("#results").append(write);
     console.log("Chosen:", newPopulation);
     return newPopulation;
}


