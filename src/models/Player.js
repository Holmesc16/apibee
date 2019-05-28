const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
    number: Number,
    age: Number,
    nationality: String,
    club: {
        name: String,
        country: String
    },
    position: String,
    isStarter: Boolean,
    cleats: [String]
})

module.exports = mongoose.model('Player', playerSchema)