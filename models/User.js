const { model, Schema } = require('mongoose');

const userScehma = Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model('User', userScehma)
