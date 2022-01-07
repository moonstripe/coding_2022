require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

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


// get user
app.get('/test', (req, res) => {
    
    const { username } = req.body

    db.User.findOne({ username }, (e, user) => {
        if (!user) {
            res.send('user not found')
        } else {
            res.send(user)
        }
    })
})

// post user
app.post('/test', async (req, res) => {
    const { username, password } = req.body

    const newUser = await new db.User({
        username: username,
        passworld: password,
    }).save()

    res.send(`new User created: ${newUser}`);
})

// app.use(routes);

app.listen($PORT, () => {
    console.log(`Server started listening on port http://localhost:${$PORT}`);
});

