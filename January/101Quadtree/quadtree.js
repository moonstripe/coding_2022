class Point {
    constructor(x,y) {

        this.x = x;
        this.y = y;

    }
}

class Rectangle {
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

class QuadTree {
    constructor(boundary, n) {

        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;

    }
    
    subdivide() {

        let ne = new Rectangle(this.boundary.x + this.boundary.w/2, this.boundary.y - this.boundary.h/2, this.boundary.w/2, this.boundary.h/2)
        this.northEast = new QuadTree(ne, this.capacity);

        let nw = new Rectangle(this.boundary.x - this.boundary.w/2, this.boundary.y - this.boundary.h/2, this.boundary.w/2, this.boundary.h/2)
        this.northWest = new QuadTree(nw, this.capacity);

        let se = new Rectangle(this.boundary.x + this.boundary.w/2, this.boundary.y + this.boundary.h/2, this.boundary.w/2, this.boundary.h/2)
        this.southEast = new QuadTree(se, this.capacity);
        
        let sw = new Rectangle(this.boundary.x - this.boundary.w/2, this.boundary.y + this.boundary.h/2, this.boundary.w/2, this.boundary.h/2)
        this.southWest = new QuadTree(sw, this.capacity);

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
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2)
        if (this.divided) {
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