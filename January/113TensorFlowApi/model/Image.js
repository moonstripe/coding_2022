const { Schema, model } = require('mongoose');

const ImageSchema = new Schema({
    image: {
        type: Buffer,
    }
}, {
    timestamps: true,
});

const Image = model('Image', ImageSchema);

module.exports = Image;