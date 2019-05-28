const boom = require('boom')

const Cleats = require('../models/Cleats')
const Player = require('../models/Player')

exports.getCleats = async(req, res) => {
    try {
        const cleats = await Cleats.find()
        return cleats
    }
    catch(err) {
        throw boom.boomify(err)
    }
}

exports.getSingleCleats = async(req, res) => {
    try {
        const id = req.params.id
        const cleat = await Cleats.findById(id)
        return cleat
    }
    catch(err) {
        throw boom.boomify(err)
    }
}

exports.addCleats = async(req, res) => {
    try {
        const cleats = new Cleats(req.body)
        return cleats.save()
    }
    catch(err) {
        throw boom.boomify(err)
    }
}

exports.updateCleats = async(req, res) => {
    try {
        const id = req.params.id
        const cleats = req.body
        const { ...newData } = cleats 
        const update = await Cleats.findByIdAndUpdate(id, newData, { new:true })
        return update
    }
    catch(err) {
        throw boom.boomify(err)
    }
}

exports.deleteCleats = async(req, res) => {
    try {
        const id = req.params.id
        const cleats = await Cleats.findByIdAndRemove(id)
        return cleats
    }
    catch(err) {
        throw boom.boomify(err)
    }
}