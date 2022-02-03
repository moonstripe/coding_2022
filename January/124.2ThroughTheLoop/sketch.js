let magicAngle

function setup() {
  magicAngle = -asin(1 / sqrt(3))
  createCanvas(window.innerHeight, window.innerHeight, WEBGL);
  ortho(-width / 2, width / 2, height / 2, -height / 2, -300, 8000)
}

function draw() {
  ambientLight(255)
  background(245);

  rotateX(QUARTER_PI);
  rotateY(magicAngle);


  let offset = 0
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      push();


      if (y === 1 && x === 1) {

        translate((tan((frameCount / 30) - offset) * 50) + width / 6, -y * 50 + height / 6, x * 50);
        if ((tan((frameCount / 30) - offset) * 50) > 1) {
          normalMaterial()
        } else {
          ambientMaterial(0)
        }
        box(sin((frameCount / 30) - offset) * 60, 45, 45);
      } else {
        translate(width / 6, -y * 50 + height / 6, x * 50);
        box(sin((frameCount / 30) - offset) + 1 * 60, 45, 45);
      }

      pop();
      offset -= 0.01
    }
  }
}
