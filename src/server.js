const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/cleatsheet')
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err))

module.exports = fastify