const mongoose = require('mongoose')

const cleatSchema = new mongoose.Schema({
    title: String,
    brand: String,
    price: String,
    releaseDate: Number,
    features: {
        terrain: String,
        material: String,
        size: Number,
        width: String,
        color: String
    },
    hidden: Boolean,
    img: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Cleats', cleatSchema)