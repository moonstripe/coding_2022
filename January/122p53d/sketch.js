let eau
function preload() {
  eau = loadFont('./fonts/eau_sans_book.otf');
}
function setup() {
  createCanvas(800, 800, WEBGL);
  textFont(eau)
  textSize(width / 3);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  let time = millis();
  rotateX(time / 1000);
  rotateZ(time / 1234);
  text('p5.js', 0, 0);
}
