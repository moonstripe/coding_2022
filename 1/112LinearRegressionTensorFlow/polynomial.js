let x_vals = [];
let y_vals = [];

let a, b, c, d;

const learningRate = 0.5;
const optimizer = tf.train.adam(learningRate);

function normalizeX(x) {
    return map(x, 0, width, -1, 1);
}

function normalizeY(y) {
    return map(y, 0, height, 1, -1);
}

function unNormalizeX(normX) {
    return map(normX, -1, 1, 0, width)
}

function unNormalizeY(normY) {
    return map(normY, -1, 1, height, 0)
}

function setup() {
    createCanvas(400, 400);

    a = tf.variable(tf.scalar(random(-1, 1)));
    b = tf.variable(tf.scalar(random(-1, 1)));
    c = tf.variable(tf.scalar(random(-1, 1)));
    d = tf.variable(tf.scalar(random(-1, 1)));
}

function loss(pred, label) {
    // mean squared error defines "loss"
    return pred.sub(label).square().mean()
}

function predict(xArr) {
    const xs = tf.tensor1d(xArr);
    // y = ax^2 + bx +c;
    const ys = xs.pow(tf.scalar(3)).mul(a)
        .add(xs.square().mul(b))
        .add(xs.mul(c))
        .add(d)
    return ys;
}

function mousePressed() {
    // normalize axes
    let x = normalizeX(mouseX);
    let y = normalizeY(mouseY);
    x_vals.push(x);
    y_vals.push(y);
}

function draw() {
    tf.tidy(() => {
        if (x_vals.length > 0) {
            const ys = tf.tensor1d(y_vals);
            optimizer.minimize(() => loss(predict(x_vals), ys))
        }

        background(0);
        stroke(255);
        strokeWeight(8);

        for (let i = 0; i < x_vals.length; i++) {
            let px = unNormalizeX(x_vals[i])
            let py = unNormalizeY(y_vals[i])
            point(px, py)
        }

        if (x_vals.length > 0) {
            let curveX = []

            for (let x = -1; x < 1; x += 0.05) {
                curveX.push(x)
            }

            const ys = tf.tidy(() => predict(curveX))
            let curveY = ys.dataSync();

            ys.dispose()

            beginShape();
            noFill();
            stroke(0, 255, 0);
            strokeWeight(4);

            for (let i = 0; i < curveX.length; i++) {
                let x = unNormalizeX(curveX[i])
                let y = unNormalizeY(curveY[i])
                vertex(x, y)
            }

            endShape();
        }
    })

    console.log(tf.memory().numTensors)
}