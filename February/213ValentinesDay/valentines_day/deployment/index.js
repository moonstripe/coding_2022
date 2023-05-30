require('dotenv').config()
const express = require('express')
const path = require('path');
const $PORT = process.env.PORT || 8080
const app = express()

if (process.env.NODE_ENV === 'production') {

    const root = path.join(__dirname, 'build/')

    console.log(`root: ${root}`)

    app.use(express.static(path.join( root )));

    app.get('*',(req, res, next) => {
        res.sendFile('index.html', { root });
    });
}

app.listen($PORT, () => {
    console.log(`Server started listening on PORT ${$PORT}`)
})