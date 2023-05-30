let magicAngle

function setup() {
  magicAngle = asin(1 / sqrt(3))
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  ortho(-width / 2, width / 2, height / 2, -height / 2, -300, 8000)
}

function draw() {
  ambientLight(255)
  background(50);

  rotateX(0.5);
  rotateY(-0.4);

  let offset = 0
  for (let y = 0; y < 3; y++) {
    push();
      if (y === 2) {
        ambientMaterial(0)
        translate((sin(frameCount / 30 - offset) * map(noise(-offset, offset), 0, 1, 15, 45)) + 150,  y*140 - height / 6, (cos(frameCount / 30 - offset) * map(noise(-offset, offset), 0, 1, 90, 120)) + 15);
      } else if (y === 1) {
        rotateY((frameCount/300))
        translate((sin(frameCount / 30 - offset) * map(noise(-offset, offset), 0, 1, 15, 45)) + 150,  y*140 - height / 6, (cos(frameCount / 30 - offset) * map(noise(-offset, offset), 0, 1, 90, 120)) + 15);
      } else {
        normalMaterial()
        rotateY((frameCount/300))
        translate((sin(frameCount / 30 - offset) * map(noise(-offset, offset), 0, 1, 15, 45)) + 150,  y*140 - height / 6, (cos(frameCount / 30 - offset) * map(noise(-offset, offset), 0, 1, 90, 120)) + 15);
      }
      // normalMaterial()
      
      // cool noise effect
      // translate((sin(noise(frameCount / 30 - offset)) * 60) + 45, -y * 130 + height / 6, 0);
    
    
    sphere(60);
    pop();
    offset -= 2
  }
}