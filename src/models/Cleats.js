const mongoose = require('mongoose')
const  ObjectId = mongoose.Schema.Types.ObjectId

const cleatSchema = new mongoose.Schema({
    title: String,
    brand: String,
    price: String,
    releaseDate: String,
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
    },
    player_id: ObjectId
})

module.exports = mongoose.model('Cleats', cleatSchema)