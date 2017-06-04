/**
 * Genetic algorithm examples 
 * author: Marin Bugaric
 * marin.bugaric@fesb.hr
 * Računska inteligencija (neuro-fuzzy-genetski sustavi)
 * FESB
 * 
 * MI + LAMBDA selection
 * selection is performed in rounds, number of rounds is defined by VEL_POP and MI
 * In each round we take MI parents, and by crossover generate LAMBDA children
 * In this version, we estimate the fitness value for children (for simplicity)
 * From MI+LAMBDA individuals we than extract MI best individuals and add to next generation
 * This is repeated until we have VEL_POP number of individuals in next generation
 * 
 * Mutation is then applied
 * Elitism is skipped in this selection
 * 
 * Crossover probability defines in how many cases the crossover will be applied
 * If crossover is not applied, one of the parents is copied
 * In this case we don't have mating pool
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
var matingPool = null;
const VEL_POP = 8; //For simplicity must be divisible by MI
const MI = 4;
const LAMBDA = 5;
const NUM_GEN = 5;
const CROSSOVER_PROBABILITY = 0.9;
const MUTATION_PROBABILITY = 0.05;
const NUM_ELITES = Math.min(0, VEL_POP - 1);
const PAUSE_BETWEEN_GENERATIONS = 10000;

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

    function selection() {
        newPopulation = new Array();
        newPopulation = miPlusLambdaSelectionWithDebug(population, MI, LAMBDA);
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
            newPopulation = new Array();
            population = selection();
        }
    });
    $(a).on('gaEE', function () {
        if (curr_gen == NUM_GEN) {
            bestSolution = getFittest();
            $("#results").append("<br /><span class=\"large\">Best solution is individual with fitness " + bestSolution[0].fitness + "</h1>&nbsp");
        }
        if (curr_gen < NUM_GEN) {
            updateResults();
            bestSolution = null;
            //Crossover happens within selection
            population = mutate();
            $("#results").append("<br /><b>Generacija " + (curr_gen + 1) + " </b>");
            evolve();
            curr_gen++;
        }


    });


})();





