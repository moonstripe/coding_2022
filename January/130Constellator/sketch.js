let stars = []
let lines = []
let H = window.innerHeight
let W = window.innerWidth

function ccw(A, B, C) {
  // takes points
  return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x)
}

function intersect(A, B, C, D) {
  // console.log(ccw(A, C, D), ccw(B, C, D), ccw(A, B, C), ccw(A, B, D))
  return ccw(A, C, D) != ccw(B, C, D) && ccw(A, B, C) != ccw(A, B, D)
}

function setup() {
  createCanvas(W, H);

  for (let i = 0; i < 10; i++) {
    stars.push({ x: random(W / 2), y: random(H / 2) })
  }

  for (let j = 0; j < stars.length - 1; j++) {
    let randomStar = random(stars)
    lines.push({ x1: stars[j].x, y1: stars[j].y, x2: randomStar.x, y2: randomStar.y })
  }

}

function draw() {
  background(220);
  strokeWeight(4)


  for (let k = 0; k < lines.length; k++) {
    for (let l = 0; l < lines.length; l++) {
      // feed algo points from lines
      // AB segment = lines[k]
      // CD segment = lines[l]
      let [A, B, C, D] = [{ x: lines[k].x1, y: lines[k].y1 }, { x: lines[k].x2, y: lines[k].y2 }, { x: lines[l].x1, y: lines[l].y1 }, { x: lines[l].x2, y: lines[l].y2 }]

      if (intersect(A, B, C, D)) {
        // stroke(150)
        // line(lines[k].x1, lines[k].y1, lines[k].x2, lines[k].y2)
        // console.log('intersection found')
      } else {
        // console.log('no intersection found')
        stroke(50)
        line(lines[k].x1, lines[k].y1, lines[k].x2, lines[k].y2)
      }
    }
  }

  stroke(255)
  for (let k = 0; k < stars.length; k++) {
    point(stars[k].x, stars[k].y)
  }
}

