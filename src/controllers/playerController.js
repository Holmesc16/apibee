const boom = require('boom')

const Player = require('../controllers/Player')
const Cleats = require('../controllers/Cleat')

exports.getPlayer = async(req, res) => {
    try {
        const players = await Player.find()
        return players
    }
    catch(err) {
        throw boom.boomify(err)
    }
}

exports.getSinglePlayer = async (req, res) => {
    try {
    const id = req.params.id || req.params === undefined ? req.id : req.params.id
    const player = await Player.findById(id)
    return player
    }
    catch(err) {
        throw boom.boomify(err)
    }
}

exports.getPlayersCleats = async (req) => {
    try {
        const id = req.params.id || req.params === undefined ? req.id : req.params.id
        const cleats = await Cleats.find({ player_id: id })
        return cleats
    }
    catch(err) {
        boom.boomify(err)
    }
}