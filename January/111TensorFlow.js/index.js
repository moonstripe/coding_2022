const tf = require('@tensorflow/tfjs');

const model = tf.sequential();

const hidden1 = tf.layers.dense({
	units: 4,
	inputShape: [2]
})

const hidden2 = tf.layers.dense({
	units: 3
})

const output = tf.layers.dense({
	units: 2
})

model.add(hidden1)
model.add(hidden2)
model.add(output)

model.compile({
	optimizer: tf.train.adam(),
	loss: 'categoricalCrossentropy', optimizer: 'sgd'
});

const xs = tf.tensor2d(
	[[3,3], [6,3], [10, 78], [12,73]]
	)

const ys = tf.tensor2d(
	[[0,1], [1,1], [1,0], [0,0]]
	)

const train = async () => {
	for (let i = 0; i < 1000; i++) {
		const response = await model.fit(xs, ys, {
			epochs: 3,
			shuffle: true
		})
		console.log(response.history.loss[0])

	}
}

train().then(() => {
	model.predict(tf.tensor2d([[34,63], [4,6]])).print()
}).catch(e => {
	throw new Error(e);
});

