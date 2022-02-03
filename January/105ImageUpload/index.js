const express = require('express')
const app = express()
const multer = require('multer')
const port = 3001

// creates middleware to upload photos

const upload = multer({
    dest: 'images',
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

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

