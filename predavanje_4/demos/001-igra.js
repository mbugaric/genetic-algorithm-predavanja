/**
* The Matter.js demo page controller and example runner.
*
* NOTE: For the actual example code, refer to the source files in `/examples/`.
*
* @class Demo
*/

    var curr_gen = 1;
    var curr_pop = 0;
    var population = new Array();

    (function () {
        var sourceLinkRoot = 'https://github.com/liacurr_pop_help_counteru/matter-js/blob/master/examples';
        var VEL_POP = 8;
        var NUM_GEN = 5;
        var PAUSE_BETWEEN_GENERATIONS = 0;
        ;

        var demo = MatterTools.Demo.create({
            /*tools: {
                inspector: true,
                gui: true
            },*/
            inline: true,
            preventZoom: true,
            resetOnOrientation: true,
            examples: [
                {
                    name: 'Slingshot',
                    id: 'slingshot',
                    init: Example.slingshot,
                }
            ]
        });

        document.body.appendChild(demo.dom.root);
        MatterTools.Demo.start(demo);
        


    })();


    
    
    