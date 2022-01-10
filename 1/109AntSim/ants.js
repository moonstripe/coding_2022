class Lair {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    show = () => {
        stroke(150)
        fill(150)
        ellipseMode(CENTER)
        circle(this.x, this.y, this.r)
    }

    supplement = () => {
        this.r = this.r + 5;
    }
}

class FoodSource {
    constructor(x, y, c) {
        this.x = x;
        this.y = y;
        this.capacity = c;
    }

    deplete = () => {
        this.capacity = this.capacity - 5;
    }

    show = () => {
        stroke(0, 128, 0)
        fill(0, 128, 0)
        ellipseMode(CENTER)
        circle(this.x, this.y, this.capacity)
    }
}

class Ant {

    constructor(lair, antSpeed) {
        this.pos = createVector(lair.x, lair.y);
        this.lair = lair.x, lair.y;

        this.target = createVector(lair.x, lair.y)
        this.maxSpeed = antSpeed
        this.maxForce = 1

        this.vel = p5.Vector.random2D().setMag(this.maxSpeed);
        this.acc = createVector();
        this.r = 5;

        this.hasFood = false;
    }
    wallCollide = () => {
        if (this.pos.x + this.r >= WIDTH) {
            this.pos.add(this.vel.mult(-1, 1));
            return true
        } else if (this.pos.x - this.r <= 0) {
            this.pos.add(this.vel.mult(-1, 1));
            return true
        } else if (this.pos.y + this.r >= HEIGHT) {
            this.pos.add(this.vel.mult(1, -1));
            return true
        } else if (this.pos.y - this.r <= 0) {
            this.pos.add(this.vel.mult(1, -1));
            return true
        } else {
            return false
        }
    }
    setRandomDirection = () => {
        this.vel = p5.Vector.random2D().setMag(this.maxSpeed);
    }
    sendHome = () => {
        console.log('sending home')

        // from vehicle.arrive()
        var desired = p5.Vector.sub(this.target, this.pos);
        var d = desired.mag();
        var speed = this.maxSpeed;
        if (d < 100) {
            speed = map(d, 0, 100, 0, this.maxSpeed);
        }
        this.vel = desired.setMag(this.maxSpeed)
        // desired.setMag(speed);
        // var steer = p5.Vector.sub(desired, this.vel);
        // steer.limit(this.maxforce);
        // this.applyForce(steer.mult(1));
        // unexpected behvaior: changes direction, but not towards home
    }
    applyForce = (f) => {
        this.acc.add(f);
    }
    update = () => {
        if (!this.wallCollide()) {
            this.pos.add(this.vel);
            this.vel.add(this.acc);
            this.acc.mult(0);
        }

        // random motion behavior
        // if (!this.hasFood) {
        //     this.vel = this.vel.add(p5.Vector.random2D());
        //     this.vel.setMag(this.maxSpeed)
        // }
    }
    show = () => {

        if (this.hasFood) {
            stroke(0, 128, 0)
        } else {
            stroke(255);
        }
        strokeWeight(this.r);
        point(this.pos.x, this.pos.y);
    }


}