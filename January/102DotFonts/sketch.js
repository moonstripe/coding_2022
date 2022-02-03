let font;
const vehicles = [];

function preload() {
    font = loadFont('./AvenirNextLTPro-Demi.otf');
}

function setup() {
    createCanvas(600,300);
    background(51);

    const points = font.textToPoints('stripe', 100, 200, 192, {
        sampleFactor: 0.25
    })

    points.forEach(pt => {
        const vehicle = new Vehicle(pt.x, pt.y)
        vehicles.push(vehicle)
    })
}

function draw() {
    background(51);
    vehicles.forEach(v => {
        v.behaviors();
        v.update();
        v.show();
    })
}