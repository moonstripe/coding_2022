let cols, rows;
const scl = 100;
const w = 2000;
const h = 1000;

let flying = 0;

let terrain = []

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL)
    cols = w / scl;
    rows = h / scl;
    // create 2d array for terrain
    for (let x = 0; x < cols; x++) {
        terrain[x] = [];
        for (let y = 0; y < rows; y++) {
            terrain[x][y] = 0;
        }
    }
}

function draw() {
    // iterate flying
    flying -= 0.01;
    let yoff = flying;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -200, 200);
            xoff += 0.1;
        }
        yoff += 0.1;
    }

    background(51);
    // translate the field from center screen to left so we can see it in frame
    translate(0, 50);
    // lay the field flat
    rotateX(PI / 3);
    // set triangle color
    fill(0, 200, 0, 50);
    // translate again to center
    translate(-w / 2, -h / 2)

    // draw matrix on screen
    for (let y = 0; y < rows; y++) {
        beginShape(TRIANGLE_STRIP)
        for (let x = 0; x < cols; x++) {
            vertex(x * scl, y * scl, terrain[x][y]);
            vertex(x * scl, (y + 1) * scl, terrain[x][y + 1])
        }
        endShape();
    }

}