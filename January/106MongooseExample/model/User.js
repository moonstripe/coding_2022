const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        require: [true, 'Username is required'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 8,
        require: [true, 'Password is required'],
    },
}, {
    timestamps: true,
});

const User = model('User', UserSchema);

module.exports = User;