let img;
let borderWidth = 600;
let borderHeight = 600;
let points = [];
let imageWidth;
let imageHeight;
let inputText;


function preload() {
    img = loadImage('assets/moonstripe.png');
}

function offset(size) {
    return (size * 0.25) / 2
}

function setup() {

    // setCanvas

    createCanvas(borderWidth, borderHeight);

    // borderTexture

    for (let i = 0; i < 50; i++) {
        points.push({ x: random(borderWidth), y: random(borderHeight), sW: random(3, 7), sC: random(100, 255)});
    }

    // imagePlacement

    imageWidth = borderWidth * 0.75
    imageHeight = borderHeight * 0.75

    img.resize(imageWidth, imageHeight);
}

function draw() {
    background(0);

    for (let i = 0; i < points.length; i++) {
        strokeWeight(points[i].sW);
        stroke(points[i].sC);
        point(points[i].x, points[i].y)
    }

    inputText = document.querySelector('#overlayInput').value

    strokeWeight(2);
    stroke(255)
    fill(255);
    image(img, offset(borderWidth), offset(borderHeight));
    text(inputText, 2*offset(borderWidth), 2*offset(borderHeight))
}