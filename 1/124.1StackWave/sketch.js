let magicAngle

function setup() {
  magicAngle = asin(1 / sqrt(3))
  createCanvas(window.innerHeight, window.innerHeight, WEBGL);
  ortho(-width / 2, width / 2, height / 2, -height / 2, -300, 8000)
}

function draw() {
  ambientLight(255)
  background(200);

  rotateX(0.5);
  rotateY(-0.4);

  let offset = 0
  for (let y = 0; y < 3; y++) {
    push();
    
    // special behavior for middle

    if (y === 1) {
      ambientMaterial(0)
      translate((sin(frameCount / 30 - offset) * 60) + 45, -y * 130 + height / 6, 0);
      // cool noise effect
      // translate((sin(noise(frameCount / 30 - offset)) * 60) + 45, -y * 130 + height / 6, 0);
    } else {
      normalMaterial();
      translate(0, -y * 130 + height / 6, 0);
    }
    
    cylinder(180, 120, 48, 1, false, true);
    pop();
    offset -= 0.5
  }
}
