let capture;
let ctx;
let model;
let predictions;

// document.getElementById().addEventListener('loadeddata')

const loadModel = async () => {
  let m = await blazeface.load();
  return m;
}

function preload() {
  loadModel().then(res => {
    model = res
  }).catch(e => console.log(e));
}

function setup() {
  createCanvas(640, 480);
  background(220);
  let constraints = {
    video: {
      optional: [{ maxFrameRate: 29 }]
    },
    audio: false
  };
  capture = createCapture(constraints);
  capture.hide();

}

const makePredictions = async (model, capture) => {
  let predictions = await model.estimateFaces(capture.elt, false);
  image(capture, 0, 0, capture.width, capture.height);
  if (predictions.length > 0 && predictions[0]['probability'][0] > 0.95) {
    
    // console.log(JSON.stringify(predictions));
    const topLeft = predictions[0].topLeft;
    const bottomRight = predictions[0].bottomRight;
    var probability = predictions[0].probability;
    const size = [bottomRight[0] - topLeft[0], bottomRight[1] - topLeft[1]];

    // console.log('landmarks', predictions[0].landmarks.length)

    stroke(181,33,49)
    strokeWeight(80)
    beginShape()
    for (let i = 0; i < 2; i++) {
      let eye = predictions[0].landmarks[i];
      if (i===0) {
        vertex(eye[0]-15, eye[1])
      } else {
        vertex(eye[0]+15, eye[1])
      }
    }
    endShape()
  }
}

function draw() {
  if (!model) {
    return
  } else {
    // console.log('draw')
    makePredictions(model, capture);
  }
}
