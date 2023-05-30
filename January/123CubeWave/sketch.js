let magicAngle = asin(1 / sqrt(3))

function setup() {
  createCanvas(window.innerHeight, window.innerHeight, WEBGL);
  ortho(-width / 2, width / 2, height / 2, -height / 2, -300, 8000)
}

function draw() {
  background(200);
  orbitControl();
  normalMaterial();

  rotateX(0.5);
  rotateY(-0.4);

  let offset = 0
  for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 6; y++) {
      push();
      translate((sin((frameCount / 30) - offset) * 135) + 150, -y * 40 + height / 2, 400 - x * 40);
      box(sin((frameCount / 30) - offset) * 180, 30, 30);
      pop();
      offset -= 0.01
    }
  }
}
