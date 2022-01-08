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
    image: {
        type: Buffer
    },
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})

// get user (id)
app.get('/image/:_id', (req, res) => {
    const { _id } = req.params

    if (!!_id) {
        db.User.findOne({ username }, (e, user) => {
            if (!user) {
                res.send('user not found')
            } else {
                res.set('Content-Type', 'image/png')
                res.send(user.image)
            }
        })
    } else {
        res.send('user not found')
    }
})

// get user (username)
// weird behavior: req.body is empty when sending form-data request and not x-www-urlencoded
app.get('/image', (req, res) => {

    const { username } = req.body

    console.log(req)

    if (!!username) {
        db.User.findOne({ username }, (e, user) => {
            if (!user) {
                res.send('user not found')
            } else {
                res.set('Content-Type', 'image/png')
                res.send(user.image)
            }
        })
    } else {
        res.send('user not found')
    } 
})

// delete user
app.delete('/image/:_id', (req, res) => {
    const { _id } = req.params

    db.User.findOneAndDelete({ _id }, (e, user) => {
        if (!user) {
            res.send('user not found')
        } else {
            res.send(`deleted ${_id}`)
        }
    })
})

// post user
app.post('/image', upload.single('image'), async (req, res) => {
    const { username, password } = req.body
    const { buffer } = req.file
    console.log(`username: ${username}, password: ${password}, image: ${buffer}`)

    if (!username || !password || !buffer) {
        res.send('you need username, password and image')
    } else {
        const newUser = await new db.User({
            username,
            password,
            image: buffer
        }).save()

        res.send(`new User created: ${newUser}`);
    }
})

// app.use(routes);

app.listen($PORT, () => {
    console.log(`Server started listening on port http://localhost:${$PORT}`);
});

