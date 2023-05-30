function setup() {
  createCanvas(400, 400, WEBGL);
  let words = new wordGen(10, 15);

  words.declare();
}

function draw() {
  const font = loadFont('AvenirNextLTPro-Demi.otf')
  background(220);

  ortho()
  sphere(40)
  textFont(font)
  text("what's good", )
}
