var Example = Example || {};

    Example.slingshot = function () {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composites = Matter.Composites,
            Events = Matter.Events,
            Constraint = Matter.Constraint,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            World = Matter.World,
            Bodies = Matter.Bodies;

       

        function createAllBodies() {
            // add bodies
            var ground = Bodies.rectangle(395, 600, 1500, 50, { isStatic: true }),
                wall = Bodies.rectangle(1100, 250, 30, 700, { isStatic: true }),
                upperWall = Bodies.rectangle(395, -100, 1500, 50, { isStatic: true }),
                rock = Bodies.polygon(170, 450, 8, 20, rockOptions),
                rockOptions = { density: 0.03 };
            anchor = { x: 170, y: 450 },
                elastic = Constraint.create({
                    pointA: anchor,
                    bodyB: rock,
                    stiffness: 0.15
                });

            var pyramid = Composites.pyramid(500, 390, 9, 10, 0, 0, function (x, y) {

                
                return Bodies.rectangle(x, y, 25, 40);
            });



            allBodies = [ground, pyramid, rock, elastic, wall, upperWall];

            return [allBodies, rockOptions, anchor, elastic];
        }

        // create engine
        var engine = Engine.create(),
            world = engine.world;


        // create renderer
        var render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: Math.min(document.documentElement.clientWidth, 800),
                height: Math.min(document.documentElement.clientHeight, 600),
                showAngleIndicator: true,
                wireframes: false,
            }
        });


        Render.run(render);
        var runner = Runner.create();   
    
        function simulate() {
            curr_pop++;
            AllBodies = createAllBodies();

            rock = AllBodies[0][2];
            rockOptions = AllBodies[1];
            anchor = AllBodies[2];
            elastic = AllBodies[3];
            pyramid = AllBodies[0][1];
            
            Runner.run(runner, engine);

            World.add(engine.world, AllBodies[0]);

            var isRockSleeping = true;

            setTimeout(function () {
                isRockSleeping = false;
            }, 2000);

            var totalMovement = 0;

            newx = population[curr_pop-1].x;
            newy = population[curr_pop-1].y;

            Events.on(engine, 'afterUpdate', function () {

                if (isRockSleeping) {
                    Matter.Body.setPosition(rock, { x: newx, y: newy })
                    Matter.Body.setVelocity(rock, { x: 2, y: 1 })
                }
                if (!isRockSleeping) {

                    pyramid.bodies.map((body) => {
                        totalMovement += Math.floor(Math.abs(body.positionPrev.x - body.position.x));
                        totalMovement += 4*Math.floor(Math.abs(body.positionPrev.y - body.position.y));
                    })
                }

                if (!isRockSleeping && (rock.position.x > 171 || rock.position.y < 430)) {
                    release = false
                    rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
                    elastic.pointA = null;
                    elastic.bodyB = null;
                    elastic.bodyB = rock;

                    setTimeout(function () {
                        population[curr_pop-1].fitness = totalMovement;
                        $( "#results" ).append( "<span id=\"fitness_"+curr_gen+"_"+curr_pop+"\">"+totalMovement+"</span>&nbsp" );
                    }, 2500);
                }
            });


        }

        simulate();

        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 600 }
        });

        // context for MatterTools.Demo
        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function () {
                Matter.Render.stop(render);
                Matter.Runner.stop(runner);
            }
        };
    };