/**
 * Genetic algorithm examples
 * Marin Bugaric
 * 
 * Matter.js slingshot example used : https://github.com/liabru/matter-js
 * The Matter.js demo page controller and example runner.
*/

var curr_gen = 1;
var curr_pop = 0;
var population = new Array();
var VEL_POP = 6;
var NUM_GEN = 5;
var elite = Math.min(0, VEL_POP-1);
var individualsForSelection = Math.min(3, VEL_POP-1);
var PAUSE_BETWEEN_GENERATIONS = 5000;

(function () {
    var sourceLinkRoot = '';

    var a = { foo: 'bar' };

    var demo = MatterTools.Demo.create({
        inline: true,
        preventZoom: true,
        resetOnOrientation: true,
        examples: [
            {
                name: 'Slingshot',
                id: 'slingshot',
                init: Example.slingshot,
                sourceLink: sourceLinkRoot + '/slingshot.js'
            }
        ]
    });

    document.body.appendChild(demo.dom.root);

    function generateInitialPopulation() {
        for (var br = 0; br < VEL_POP; br++) {
            let tempPosition = {
                x: Math.floor(Math.random() * 120),
                y: Math.floor(Math.random() * 60) + 410,
                fitness: 0,
            }
            population.push(tempPosition);
        }
    }

    /*function fillPopulationWithRandom(fillPopulation, alreadyHas) {
        for (var br = alreadyHas; br < VEL_POP; br++) {
            let tempPosition = {
                x: Math.floor(Math.random() * 70) + 70,
                y: Math.floor(Math.random() * 70) + 400,
                fitness: 0
            }
            fillPopulation.push(tempPosition);
        }
        return fillPopulation;
    }*/


    function evolve() {
        MatterTools.Demo.start(demo);
        for (curr_pop_help_counter = 1; curr_pop_help_counter < VEL_POP; curr_pop_help_counter++) {
            calculateFitness(curr_pop_help_counter)

        }


        //When finished
        setTimeout(function () {
            $(a).triggerHandler('debugSelection');
        }, 5000 * VEL_POP);

        //When finished
        setTimeout(function () {
            curr_pop = 0;
            $(a).triggerHandler('gaEE');
        }, 5000 * VEL_POP + PAUSE_BETWEEN_GENERATIONS);
    }

    function calculateFitness(index) {
        setTimeout(function () {
            MatterTools.Demo.reset(demo);
        }, 5000 * index);
    }

    function mutate(probability, numberOfElites) {
        population.map((individual, index) => {
            if (individual != null && index > (numberOfElites - 1)) {
                //X coordinate
                lowerBoundX = individual.x - 40;
                lowerBoundX = lowerBoundX < 0 ? 0 : lowerBoundX;
                upperBoundX = individual.x + 40;
                upperBoundX = upperBoundX > 170 ? 170 : upperBoundX;
                let newX = actualMutation(individual.x, probability, lowerBoundX, upperBoundX);
                individual.x = newX;
                //Y coordinate
                lowerBoundY = individual.y - 40;
                lowerBoundY = lowerBoundY < 300 ? 300 : lowerBoundY;
                upperBoundY = individual.y + 40;
                upperBoundY = upperBoundY > 500 ? 500 : upperBoundY;
                let newY = actualMutation(individual.y, probability, lowerBoundY, upperBoundY);
                individual.y = newY;
            }
            else {
                //console.log("Mutation will skip elite with fitness " + individual.fitness)
            }
        })
    }

    function getFittest()
    {
        return returnNLargest(population, 1)
    }

    function crossover() { 
        
        newPopulation = new Array();


        for (var br = 0; br < individualsForSelection; br++) {
            newPopulation[br]=population[br];
        }

        for (var br = individualsForSelection; br < VEL_POP; br++) {
            if(br<2)
            {
                let tempPosition = {
                    x: Math.floor(Math.random() * 120),
                    y: Math.floor(Math.random() * 60) + 410,
                    fitness: 0
                }
                newPopulation.push(tempPosition);
                console.log("Not enough data for crossover - generating random individual");
            }
            else
            {
                ind1 = Math.floor(Math.random()*individualsForSelection);
                do
                {
                    ind2 = Math.floor(Math.random()*individualsForSelection);
                }while(ind1==ind2);
                
                let minX=population[ind1].x<=population[ind2].x?population[ind1].x:population[ind2].x;
                let maxX=population[ind1].x<=population[ind2].x?population[ind2].x:population[ind1].x;
                let minY=population[ind1].y<=population[ind2].y?population[ind1].y:population[ind2].y;
                let maxY=population[ind1].y<=population[ind2].y?population[ind2].y:population[ind1].y;
  

                let tempPosition = {
                    x: randomIntFromInterval(minX,maxX),
                    y: randomIntFromInterval(minY,maxY),
                    fitness: 0
                }
                newPopulation.push(tempPosition);
            }
            
        }

        return newPopulation;
    }

    function selection() {
        newPopulation = new Array();
        newPopulation = stohUnivSelectionWithDebug(population, individualsForSelection);
        return newPopulation;
        //population = fillPopulationWithRandom(newPopulation, individualsForSelection);
    }

    generateInitialPopulation();

    evolve();

    $(a).on('debugSelection', function () {
        if (curr_gen < NUM_GEN) {
            newPopulation = new Array();
            population = selection();
        }
    });
    $(a).on('gaEE', function () {
        if(curr_gen == NUM_GEN)
        {
            bestSolution=getFittest();
            $( "#results" ).append( "<br /><span class=\"large\">Best solution is individual with fitness "+bestSolution[0].fitness+"</h1>&nbsp" );
        }
        if (curr_gen < NUM_GEN) {
            updateResults();
            bestSolution=null;
            population=crossover();
            //mutate(0.2, elite);
            $("#results").append("<br /><b>Generacija " + (curr_gen + 1) + " </b>");
            evolve();
            curr_gen++;
        }
        
        
    });


})();



