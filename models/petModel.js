
const { model, Schema } = require('mongoose')

const petSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = model('Pet', petSchema);
