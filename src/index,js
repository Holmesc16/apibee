const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')
const routes = require('./routes')
const swagger = require('./config/swagger')
//Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

//GraphQL
const gql = require('fastify-gql')

// Import GraphQL Schema
const schema = require('./schema')

// Register Fastify GraphQL
fastify.register(gql, {
	schema,
	graphiql: true
})

mongoose.connect('mongodb://localhost/cleatsheet', { useNewUrlParser: true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err))

routes.forEach((route, $i) => {
    fastify.route(route)
})

//Server
const init = async () => {
    try {
        await fastify.listen(3000, '0.0.0.0')
        fastify.swagger()
        fastify.log.info(`server running on ${fastify.server.address().port}`)
    }
    catch(err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

init()