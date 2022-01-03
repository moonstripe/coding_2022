export class Vehicle {
    constructor(p5, x, y) {
        this.p5 = p5
        this.pos = this.p5.createVector(p5.random(p5.width), p5.random(p5.height));
        this.target = this.p5.createVector(x, y);
        this.vel = window.p5.Vector.random2D();
        this.acc = this.p5.createVector();
        this.r = 5;
        this.maxspeed = 10;
        this.maxforce = 1;
    }
    behaviors() {
        var arrive = this.arrive(this.target);
        var mouse = this.p5.createVector(this.p5.mouseX, this.p5.mouseY);
        var flee = this.flee(mouse);

        arrive.mult(1);
        flee.mult(5);

        this.applyForce(arrive);
        this.applyForce(flee);
    }
    applyForce(f) {
        this.acc.add(f);
    }
    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }
    show() {
        this.p5.stroke(40,40,40);
        this.p5.strokeWeight(this.r);
        this.p5.point(this.pos.x, this.pos.y);
    }
    arrive(target) {
        var desired = window.p5.Vector.sub(target, this.pos);
        var d = desired.mag();
        var speed = this.maxspeed;
        if (d < 100) {
            speed = this.p5.map(d, 0, 100, 0, this.maxspeed);
        }
        desired.setMag(speed);
        var steer = window.p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
    }
    flee(target) {
        var desired = window.p5.Vector.sub(target, this.pos);
        var d = desired.mag();
        if (d < 50) {
            desired.setMag(this.maxspeed);
            desired.mult(-1);
            var steer = window.p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxforce);
            return steer;
        } else {
            return this.p5.createVector(0, 0);
        }
    }
}
  
  
  
  
  
  
