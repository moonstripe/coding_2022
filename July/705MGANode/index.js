const express = require('express')
const passport = require('passport')
const routes = require('./routes')
const winston = require('winston');
const expressWinston = require('express-winston');

require('./config/passport')

require('dotenv').config()

// initialize server

const PORT = process.env.PORT
const app = express()
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// intialize winston
app.use(expressWinston.logger({
    transports: [
        new winston.transports.File({
            name: 'access-file',
            filename: 'access-error.log',
            level: 'info' //This setting is what i need to change for access lines only
        })
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: true,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; }
}));

app.use(routes)

app.use(passport.initialize());

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})