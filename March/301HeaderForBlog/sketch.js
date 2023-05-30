function setup() {
  createCanvas(innerWidth, 400, WEBGL);
}

function draw() {
  background(250);


  translate(0, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(200, 200);
  pop();


}
