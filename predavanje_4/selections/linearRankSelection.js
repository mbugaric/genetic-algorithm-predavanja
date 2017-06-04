function linearRankSelection(population, N) {
    let newPopulation = new Array();

    let sortedPopulation = population.sort(function (a, b) {
        return a.fitness - b.fitness;
    });

    let probabilities = new Array();
    let q = new Array();

    sortedPopulation.map((individual,index)=>{
         probabilities.push(2*(index+1)/(sortedPopulation.length*(sortedPopulation.length+1))) 
         q.push((2*(index+1)/(sortedPopulation.length*(sortedPopulation.length+1))) + (q[index-1]||0.0) )
    });

    for (let i = 0; i < N; i++) {
        let found = false;
        let r = Math.random();
        q.map((value, index) => {
            if (r < value && !found) {
                found = true;
                let foundIndex = index;
                newPopulation.push(sortedPopulation[foundIndex])
            }
        })
    }
    return newPopulation;
}


function linearRankSelectionWithDebug(population, N) {
    let newPopulation = new Array();

    let sortedPopulation = population.sort(function (a, b) {
        return a.fitness - b.fitness;
    });

    let probabilities = new Array();
    let q = new Array();

    $( "#results" ).empty();
    $("#results").append("<b>Sortirano: </b>");
    let text = '';
    sortedPopulation.map((individual,index)=>{
         $( "#results" ).append( "<span  id=\"fitness_"+curr_gen+"_"+(index+1)+"\" >"+individual.fitness+"</span>&nbsp" );
         probabilities.push(2*(index+1)/(sortedPopulation.length*(sortedPopulation.length+1))) 
         text += " " + (Math.round( 2*(index+1)/(sortedPopulation.length*(sortedPopulation.length+1))*1000 ) / 10) + "%,";
         q.push((2*(index+1)/(sortedPopulation.length*(sortedPopulation.length+1))) + (q[index-1]||0.0) )
    });
    $( "#results" ).append( '<br /><span class="small" >Probabilities '+text+"</span>&nbsp" );

    console.log("probabilities", probabilities);
    console.log("q", q);

    for (let i = 0; i < N; i++) {
        setTimeout(function () {
            let found = false;
            let r = Math.random();
            q.map((value, index) => {
                if (r < value && !found) {
                    found = true;
                    let foundIndex = index;
                    newPopulation.push(sortedPopulation[foundIndex])
                    console.log("Generated random number " + r + " and choose " + sortedPopulation[foundIndex].fitness);
                    $("#fitness_"+curr_gen+"_"+(foundIndex+1)).addClass("selectedFitness");
                    $("#results").append("<span class=\"small\" >("+sortedPopulation[foundIndex].fitness+")</span>&nbsp");
                }
            })
            
        }, 2000*i);
    }
    return newPopulation;
}