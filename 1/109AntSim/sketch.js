const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

let antCount = 5;
let antSpeed = 6

let foodCount = 3;

let ants = []
let lair = new Lair(WIDTH / 2, HEIGHT / 2, WIDTH / 100)
let foodSources = []

function setup() {
    createCanvas(WIDTH, HEIGHT)
    background(51)

    for (let i = 0; i < antCount; i++) {
        ants.push(new Ant(lair));
    }

    for (let i = 0; i < foodCount; i++) {
        foodSources.push(new FoodSource(random(WIDTH), random(HEIGHT), 50));
    }

}

function draw() {
    background(51)

    for (let i = 0; i < ants.length; i++) {

        if (!ants[i].hasFood) {
            for (let j = 0; j < foodSources.length; j++) {
                // check for collisions between foodSources and ants
                let fD = dist(ants[i].pos.x, ants[i].pos.y, foodSources[j].x, foodSources[j].y);

                // now see if distance between two is less than sum of two radius'
                if (fD < ants[i].r + foodSources[j].capacity / 2) {
                    // deplete foodSource
                    foodSources[j].deplete();
                    // send ant home
                    ants[i].sendHome();
                    ants[i].hasFood = true;
                }

            }
        }
    }

    for (let i = 0; i < ants.length; i++) {
        if (ants[i].hasFood) {
            // check for collisions between lair and ants
            let lD = dist(ants[i].pos.x, ants[i].pos.y, lair.x, lair.y);

            // now see if distance between two is less than sum of two radius'
            if (lD < antSpeed) {
                ants[i].hasFood = false;
                lair.supplement();
                ants[i].setRandomDirection();
            }
        }
    }

    lair.show()

    foodSources.forEach(s => {
        if (s.capacity >= 5) {
            s.show();
        }
    })

    ants.forEach(a => {
        a.update();
        a.show();
    })

}