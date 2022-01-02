let qtree

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)

    let boundary = new Rectangle(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2)
    qtree = new QuadTree(boundary, 4);

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
}

function mouseMoved() {
    let m = new Point(mouseX + random(-5, 5), mouseY + random(-5, 5))
    qtree.insert(m)
    background(0);
    qtree.show()

}