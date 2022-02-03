let x_vals = [];
let y_vals = [];

let m, b;

const learningRate = 0.2;
const optimizer = tf.train.sgd(learningRate);

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

    m = tf.variable(tf.scalar(random(1)));
    b = tf.variable(tf.scalar(random(1)));
}

function loss(pred, label) {
    // mean squared error defines "loss"
    return pred.sub(label).square().mean()
}

function predict(xArr) {
    const xs = tf.tensor1d(xArr);
    // y = mx + b;
    const ys = xs.mul(m).add(b)
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
            let xs = [-1, 1]
            const ys = predict(xs)

            let x1 = unNormalizeX(xs[0])
            let x2 = unNormalizeX(xs[1])

            let liney = ys.dataSync()

            let y1 = unNormalizeY(liney[0])
            let y2 = unNormalizeY(liney[1])
            stroke(0, 255, 0);
            strokeWeight(4);
            line(x1, y1, x2, y2)
        }
    })

    console.log(tf.memory().numTensors)
}