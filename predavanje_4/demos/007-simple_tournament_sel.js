/**
 * Genetic algorithm examples 
 * author: Marin Bugaric
 * marin.bugaric@fesb.hr
 * Računska inteligencija (neuro-fuzzy-genetski sustavi)
 * FESB
 * 
 * simple tournament selection 
 * selection is performed in rounds, number of rounds is defined by VEL_POP/2
 * In each round we two random parents from initial population 
 * better one survives, and worse one is eliminated
 * 
 * Crossover is applied to replace individuals that were eliminated
 * In this case we don't have matingPool
 * 
 * Mutation and elitism is skipped in this example
 * The final number of individuals in the next population must be equal to VEL_POP
 * 
 * Crossover probability defines in how many cases the crossover will be applied
 * If crossover is not applied, one of the parents is copied
 * 
 * Matter.js slingshot example used : https://github.com/liabru/matter-js
 * The Matter.js demo page controller and example runner.
*/

var curr_gen = 1;
var curr_pop = 0;
var population = new Array();
var matingPool = null;
var tempPopulationForCrossOver = null;
const VEL_POP = 6; // For simplicity, must be even number, larger than 3
const NUM_GEN = 5;
const CROSSOVER_PROBABILITY = 0.9;
const MUTATION_PROBABILITY = 0.05;
const NUM_ELITES = Math.min(0, VEL_POP - 1);
const INDIVIDUALS_FOR_SELECTION = VEL_POP/2;
const PAUSE_BETWEEN_GENERATIONS = 2000*INDIVIDUALS_FOR_SELECTION+5000;



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

    function mutate() {
        newPopulation = new Array();
        population.map((individual, index) => {
            const prevX = individual.x, prevY = individual.y;
            //X coordinate
            lowerBoundX = individual.x - 40;
            lowerBoundX = lowerBoundX < 0 ? 0 : lowerBoundX;
            upperBoundX = individual.x + 40;
            upperBoundX = upperBoundX > 170 ? 170 : upperBoundX;
            let newX = actualMutation(individual.x, MUTATION_PROBABILITY, lowerBoundX, upperBoundX);
            individual.x = newX;
            //Y coordinate
            lowerBoundY = individual.y - 40;
            lowerBoundY = lowerBoundY < 300 ? 300 : lowerBoundY;
            upperBoundY = individual.y + 40;
            upperBoundY = upperBoundY > 500 ? 500 : upperBoundY;
            let newY = actualMutation(individual.y, MUTATION_PROBABILITY, lowerBoundY, upperBoundY);

            if (newX != prevX || newY != prevY) {
                let tempPosition = {
                    x: Math.floor(newX),
                    y: Math.floor(newY),
                    fitness: 0
                }
                newPopulation.push(tempPosition);
                console.log("Successful mutation", tempPosition);
            }
            else{
                newPopulation.push(individual);
                console.log("Skipping mutation", individual);
            }
        })
        return newPopulation;
    }

    function getFittest()
    {
        return returnNLargest(population, 1)
    }

    function selection() {
        return new Promise((resolve, reject) => {
            newPopulation = new Array();
            newPopulation = simpleTournamentSelectionWithDebug(population).then(response=>{
                resolve( newPopulation);
            });
        });
    }

    generateInitialPopulation();

    evolve();

    $(a).on('debugSelection', function () {
        if (curr_gen < NUM_GEN) {
            newPopulation = new Array();
            selection().then(response => {
                population = response;
            })
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
            $("#results").append("<br /><b>Generacija " + (curr_gen + 1) + " </b>");
            evolve();
            curr_gen++;
        }
    });
})();




