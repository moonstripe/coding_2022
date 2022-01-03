let qtree
let points = []
let font

function preload() {
    font = loadFont('./AvenirNextLTPro-Demi.otf');
}
function setup() {
    createCanvas(900, 300)

    let boundary = new Rectangle(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2)
    qtree = new QuadTree(boundary, 1);

    points = font.textToPoints('moon', 50, 200, 300, {
        sampleFactor: 0.75

    })

    console.log(points)

    for (let i = 0; i < points.length; i++) {
        stroke(255)
        strokeWeight(3)
        point(points[i].x, points[i].y)
        qtree.insert(points[i])
    }

    // for (let i = 0; i < 500; i++) {
    //    let p = new Point(random(width), random(height))

    //    qt.insert(p)

    // }
}

function draw() {
    // if (mouseIsPressed) {
    //     for (let i = 0; i < 5; i++) {
    //         let m = new Point(mouseX+random(-5,5), mouseY+random(-5,5))
    //         qtree.insert(m)
    //     }
    // }
    // background(0);
    // qtree.show()
    background(0);
    qtree.show()
}

// function mouseMoved() {
//     let m = new Point(mouseX + random(-5, 5), mouseY + random(-5, 5))
//     qtree.insert(m)
//     background(0);
//     qtree.show()

// }