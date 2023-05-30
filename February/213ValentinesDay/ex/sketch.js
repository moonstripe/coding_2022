var circles;
var img;

function preload() {
  img = loadImage('assets/IMG_5524.jpeg');
}

function setup() {
  if (img.width > img.height) {
    img.resize(window.innerWidth, 0)
  } else {
    img.resize(0, window.innerHeight)
  }
  createCanvas(img.width, img.height);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  circles = [];

  console.log('pixels', img.pixels.length);
  console.log(density);

  var total = Math.floor(img.pixels.length / 100);

  for (let i = 0; i < total; i++) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
    }
  }

}

function draw() {
  background(255);


  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];


    for (var j = 0; j < circles.length; j++) {
      var other = circles[j];
      if (circle !== other) {
        var d = dist(circle.x, circle.y, other.x, other.y);
        var distance = circle.r + other.r;

        if (d - 1 < distance) {
          circle.growing = false;
          break;
        }
      }
    }


    circle.show();
  }
}

function newCircle() {
  var x = random(0, img.width);
  var y = random(0, img.height);

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d - 1 < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    var index = (int(x) + int(y) * img.width) * 4;
    var r = img.pixels[index];
    var g = img.pixels[index + 1];
    var b = img.pixels[index + 2];
    var c = color(r, g, b);
    return new Circle(x, y, color(c));
  } else {
    return null;
  }
}