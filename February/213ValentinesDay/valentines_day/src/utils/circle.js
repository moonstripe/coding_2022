export class Circle {
    constructor(p5, x, y, color) {
        this.x = x;
        this.y = y;
        this.r = 3;
        this.rMax = 5;
        this.color = color;
        this.growing = true;

        this.grow = function () {
            if (this.growing && this.r < this.rMax) {
                this.r += 0.5;
            }
        };

        this.show = function () {
            p5.noStroke();
            p5.fill(this.color);
            p5.ellipse(this.x, this.y, this.r * 2, this.r * 2);
        };

        this.edges = function () {
            return (
                this.x + this.r >= p5.width ||
                this.x - this.r <= 0 ||
                this.y + this.r >= p5.height ||
                this.y - this.r <= 0
            );
        };
    }
}