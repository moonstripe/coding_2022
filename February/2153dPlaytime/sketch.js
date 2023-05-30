function setup() {
  createCanvas(400, 400, WEBGL);
  normalMaterial();

  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500);
}

function draw() {
  background(200);
  orbitControl();

  rotateX(0.2);
  rotateY(-0.2);
  push();
  emissiveMaterial(15);
  sphere(15)
  pop();
  push();
  normalMaterial();
  translate(cos(frameCount / 30) * 65, sin(frameCount / 30) * 65, 0)
  sphere(2);
  pop();
  push();
  normalMaterial();
  translate(cos(frameCount / 30) * 45, 0, sin(frameCount / 30) * 45)
  sphere(3);
  pop();  
  push();
  normalMaterial();
  translate(0, cos(frameCount / 30) * 25, sin(frameCount / 30) * 25)
  sphere(5);
  pop();


  // push();
  // translate(-15, 0, sin(frameCount / 30) * 65);
  // box(30);
  // pop();
  // push();
  // translate(15, 0, sin(frameCount / 30 + PI) * 65);
  // box(30);
  // pop();
}
