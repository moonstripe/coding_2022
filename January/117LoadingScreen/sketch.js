let loadingX;

function setup() {
  loadingX = random(100,155)
  createCanvas(400, 400);
  background(loadingX);
  textSize(24)
  textAlign(CENTER, CENTER);
}

function draw() {

  let outputcolor = map(sin(loadingX),0,1,100,155)

  background(outputcolor);
  text('loading', width/2, height/2)

  loadingX += 0.03;

}
