/**
 * Genetic algorithm examples 
 * author: Marin Bugaric
 * marin.bugaric@fesb.hr
 * Računska inteligencija (neuro-fuzzy-genetski sustavi)
 * FESB
 *  
 * linear sorting selection
 * probability of selection is proportional to index of idividuals sorted by fitness values
 * worse individual has index 1, and the best one has index N
 * Probabilities are than calculated (2*i)/(N*(N+1))
 * 
 * Cumulative probabilities are then calculated, and random number generated that 
 * will decide which of the candidates will be copied to matingPool
 * 
 * Crossover, mutation and elitism is then applied
 * The final number of individuals in the next population must be equal to VEL_POP
 * 
 * Crossover probability defines in how many cases the crossover will be applied
 * If crossover is not applied, one of the parents is copied
 * 
 * Mutation probability defines the probability for one bit to mutate
 * Actual mutation is not completely random, it has lower and upper limits that are allowed as result
 * 
 * Matter.js slingshot example used : https://github.com/liabru/matter-js
 * The Matter.js demo page controller and example runner.
*/

var curr_gen = 1;
var curr_pop = 0;
var population = new Array();
let matingPool = new Array();
const VEL_POP = 5;
const NUM_GEN = 3;
const CROSSOVER_PROBABILITY = 0.9;
const MUTATION_PROBABILITY = 0.05;
const NUM_ELITES = Math.min(2, VEL_POP - 1);
const MATING_POOL_SIZE = 8;
const PAUSE_BETWEEN_GENERATIONS = 2000*MATING_POOL_SIZE+2000;


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

    function getFittest() {
        return returnNLargest(population, 1)
    }

    function selection(N) {
        let matingPool = new Array();
        matingPool = linearRankSelectionWithDebug(population, N);
        return matingPool;
    }

    function crossover(matingPool) {
        newPopulation = new Array();
        for (var br = 0; br < VEL_POP - NUM_ELITES; br++) { //We need to make space for elites
            //Choose indexes of two unique individuals from matingPool
            ind1 = Math.floor(Math.random() * MATING_POOL_SIZE);
            do {
                ind2 = Math.floor(Math.random() * MATING_POOL_SIZE);
            } while (ind1 == ind2);

            if (Math.random() <= CROSSOVER_PROBABILITY) {
                //Could be midpoint, or random point along that line
                const r = Math.random();
                const newX = matingPool[ind1].x + (matingPool[ind2].x - matingPool[ind1].x) * r;
                const newY = matingPool[ind1].y + (matingPool[ind2].y - matingPool[ind1].y) * r;

                let tempPosition = {
                    x: Math.floor(newX),
                    y: Math.floor(newY),
                    fitness: 0
                }
                newPopulation.push(tempPosition);
                console.log("Crossover reproducing a new child", tempPosition)
            }
            else { //Crossover not used, send one parent to next generation
                //Send first parent (it was randomly chosen) to a new generation
                newPopulation.push(matingPool[ind1]);
                console.log("Passing parent to new generation",matingPool[ind1])
            }
        }
        return newPopulation;
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

    function elitism(elites) {
        elites.map((individual) => {
            population.push(individual);
        })
    }

    generateInitialPopulation();
    evolve();
    $(a).on('debugSelection', function () {
        if (curr_gen < NUM_GEN) {
            matingPool = new Array();
            matingPool = selection(MATING_POOL_SIZE);
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
            bestSolution = null;
            let elites = returnNLargest(population, NUM_ELITES);
            population = crossover(matingPool);
            population = mutate();
            elitism(elites);
            $("#results").append("<br /><b>Generacija " + (curr_gen + 1) + " </b>");
            evolve();
            curr_gen++;
        }
    });
})();
