const tf = require('@tensorflow/tfjs-node')
const mobilenet = require('@tensorflow-models/mobilenet');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const db = require('./model')

const $PORT = process.env.PORT || 3001

// routes not added yet
// const routes = './routes'

// connect to mongoDB database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connection to MongoDB successful.'))
    .catch((e) => { throw new Error(e) })

mongoose.set('debug', true)

// initialize express app

const app = express();

// no client

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
// }

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// creates middleware to upload photos

const upload = multer({
    limits: {
        fileSize: 4000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})

// get user (id)
// app.get('/image/:_id', (req, res) => {
//     const { _id } = req.params

//     if (!!_id) {
//         db.User.findOne({ username }, (e, user) => {
//             if (!user) {
//                 res.send('user not found')
//             } else {
//                 res.set('Content-Type', 'image/png')
//                 res.send(user.image)
//             }
//         })
//     } else {
//         res.send('user not found')
//     }
// })

// get user (username)
// weird behavior: req.body is empty when sending form-data request and not x-www-urlencoded
// app.get('/image', (req, res) => {

//     const { username } = req.body

//     console.log(req)

//     if (!!username) {
//         db.User.findOne({ username }, (e, user) => {
//             if (!user) {
//                 res.send('user not found')
//             } else {
//                 res.set('Content-Type', 'image/png')
//                 res.send(user.image)
//             }
//         })
//     } else {
//         res.send('user not found')
//     } 
// })

// delete user
// app.delete('/image/:_id', (req, res) => {
//     const { _id } = req.params

//     db.User.findOneAndDelete({ _id }, (e, user) => {
//         if (!user) {
//             res.send('user not found')
//         } else {
//             res.send(`deleted ${_id}`)
//         }
//     })
// })

// post user
app.post('/image', upload.single('image'), async (req, res) => {
    const image = req.file
    console.log(req.file)
    console.log(`image: ${image}`)
    let net;
    let cleanedImage;

    if (!image) {
        res.send('you need image')
    } else {
        // use MobileNet
        cleanedImage = tf.node.decodeImage(image.buffer, 3)
        console.log('Successfully cleaned image:', cleanedImage)

        net = await mobilenet.load();
        console.log('Successfully loaded model :', net);

        predictions = await net.classify(cleanedImage);
        console.log(`Predictions: ${JSON.stringify(predictions)}`)

        res.send(predictions)
    }
})

// app.use(routes);

app.listen($PORT, () => {
    console.log(`Server started listening on port http://localhost:${$PORT}`);
});

