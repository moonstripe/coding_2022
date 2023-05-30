export class Point {
    constructor(x,y) {

        this.x = x;
        this.y = y;

    }
}

export class Rectangle {
    constructor(x,y,w,h) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

    }

    contains(point) {
        return (point.x >= this.x - this.w &&
            point.x < this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y < this.y + this.h)
    }
}

export class QuadTree {
    constructor(p5, boundary, n, i) {

        this.p5 = p5
        this.boundary = boundary;
        this.capacity = n;
        this.index = i;
        this.points = [];
        this.divided = false;

    }
    
    subdivide() {
        let newIndex = this.index

        newIndex++;

        let ne = new Rectangle(this.boundary.x + this.boundary.w/2, this.boundary.y - this.boundary.h/2, this.boundary.w/2, this.boundary.h/2)
        this.northEast = new QuadTree(this.p5, ne, this.capacity, newIndex);

        let nw = new Rectangle(this.boundary.x - this.boundary.w/2, this.boundary.y - this.boundary.h/2, this.boundary.w/2, this.boundary.h/2)
        this.northWest = new QuadTree(this.p5, nw, this.capacity, newIndex);

        let se = new Rectangle(this.boundary.x + this.boundary.w/2, this.boundary.y + this.boundary.h/2, this.boundary.w/2, this.boundary.h/2)
        this.southEast = new QuadTree(this.p5, se, this.capacity, newIndex);
        
        let sw = new Rectangle(this.boundary.x - this.boundary.w/2, this.boundary.y + this.boundary.h/2, this.boundary.w/2, this.boundary.h/2)
        this.southWest = new QuadTree(this.p5, sw, this.capacity, newIndex);

        this.divided = true;

    }

    insert(point) {

        if (!this.boundary.contains(point)) {
            return
        }

        if (this.points.length <= this.capacity) {

            this.points.push(point)

        } else {
            if (!this.divided) {
                this.subdivide();
            }
            if (this.northEast.insert(point)) {
                return true
            } else if (this.northWest.insert(point)) {
                return true
            } else if (this.southEast.insert(point)) {
                return true
            } else if (this.southWest.insert(point)) {
                return true
            }

        }

    }

    show() {
        this.p5.stroke(51,255,51);
        this.p5.strokeWeight(1);
        this.p5.noFill();
        this.p5.rectMode(this.p5.CENTER);
        this.p5.rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2)
        if (this.divided && this.index < 7) {
            this.northEast.show()
            this.northWest.show()
            this.southEast.show()
            this.southWest.show()
        }
        
        // for (let p of this.points) {
        //     strokeWeight(4);
        //     point(p.x, p.y)
        // }
    }

}