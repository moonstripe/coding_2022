let avenir;
let eau_sans = {}
let time = 0
let x1, y1, x2, y2 = 0

function preload() {
  avenir = loadFont('./fonts/AvenirNextLTPro-Demi.otf')
  eau_sans.bold = loadFont('./fonts/eau_sans_bold.otf')
  eau_sans.book = loadFont('./fonts/eau_sans_book.otf')
}

function setup() {
  createCanvas(200, 200);
  background(220);
}

function draw() {
  background(220);
  textFont(eau_sans.book)
  fill(0);
  textSize(110)
  textAlign(CENTER, CENTER);
  stroke(0)
  strokeWeight(0);
  strokeCap(PROJECT);

  text('{    }', width / 2, height / 2)
  noFill();

  // closed
  translate(width / 2, height / 2);



  noFill();
  strokeWeight(8)
  stroke(0)

  // upper lid
  x1 = map(time, 0, 1, 15, -15)
  y1 = map(time, 0, 1, 30, -30)
  x2 = map(time, 0, 1, -15, 15)
  y2 = map(time, 0, 1, 30, -30)

  beginShape();
  if (x1 < 0) {
    vertex(-40, 0);
    bezierVertex(x1, y1, x2, y2, 40, 0);
  } else {
    vertex(40, 0);
    bezierVertex(x1, y1, x2, y2, -40, 0);
  }
  endShape();

  if (time < 1) {
    time += 0.01;
  } else {
    console.log(`bezier = (${x1}, ${y1}, ${x2}, ${y2})`)
    strokeWeight(16)
    strokeCap(ROUND)
    stroke(0, 0, 255)
    fill(0, 0, 255)
    ellipse(0, 0, 33, 33);
    noFill();
    strokeWeight(8)
    stroke(0)
  
    // upper lid
    x1 = map(time, 0, 1, 15, -15)
    y1 = map(time, 0, 1, 30, -30)
    x2 = map(time, 0, 1, -15, 15)
    y2 = map(time, 0, 1, 30, -30)
  
    beginShape();
    if (x1 < 0) {
      vertex(-40, 0);
      bezierVertex(x1, y1, x2, y2, 40, 0);
    } else {
      vertex(40, 0);
      bezierVertex(x1, y1, x2, y2, -40, 0);
    }
    endShape();
    noLoop()
  }
}
