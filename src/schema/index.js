const graphql = require('graphql')

const { GraphQLSchema, 
        GraphQLObjectType, 
        GraphQLString, 
        GraphQLInt, 
        GraphQLID, 
        GraphQLList, 
        GraphQLNonNull,
        GraphQLBoolean,
    GraphQLN } = graphql

const cleatController = require('../controllers/cleatController')
const playerController = require('../controllers/playerController')

const cleatType = new GraphQLObjectType({
    name: 'Cleat',
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        brand: { type: GraphQLString },
        string: { type: GraphQLString},
        releaseDate: { type: GraphQLString },
        features: {
            terrain: { type: GraphQLString},
            material: { type: GraphQLString},
            size: { type: GraphQLInt },
            width: { type: GraphQLString },
            color: { type: GraphQLString }
        },
        hidden: { type: GraphQLBoolean },
        img: { 
            data: {type: GraphQLNonNull },
            contentType: { type: GraphQlString }
        },
        player_id: { type: GraphQLID },
        player: { type: playerType, 
                  async resolve(parent, args) {
                      return await playerController.getSinglePlayer({ id: parent.player_id })
                  }
                } 
        })
    })

const playerType = new GraphQLObjectType({
    name: 'Player',
    fields: () => ({
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        number: { type: GraphQLInt },
        age: { type: GraphQLInt },
        nationality: { type: GraphQLString },
        club: {
            name: { type: GraphQLString },
            country: { type: GraphQLString },
        },
        position: { type: GraphQLString },
        isStarter: { type: GraphQLBoolean },
        cleats: {
            type: cleatType,
            async resolve(parent, args) {
                return await cleatController.getPlayersCleats({ id: parent._id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        cleat: {
            type: cleatType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return await cleatController.getSingleCleats(args)
            }
        },
        cleats: {
            type: new GraphQLList(cleatType),
            async resolve(parent, args) {
                return await cleatController.getCleats()
            }
        },
        player: {
            type: playerType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return await playerController.getSinglePlayer(args)
            }
        }
    }
})

const Mutations = new GraphQLObjectType({
   name: 'Mutations',
   fields:  {
        addCleats: {
            type: cleatType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)},
                title: { type: new GraphQLNonNull(GraphQLString)},
                brand: { type: new GraphQLNonNull(GraphQLString)},
                price: { type: GraphQLString },
                releaseDate: { type: GraphQLString },
                features: {
                    terrain: { type: GraphQLString },
                    material: { type: GraphQLString},
                    size: { type: GraphQLInt },
                    width: { type: GraphQLString },
                    color: { type: GraphQLString }
                },
                hidden: { type: GraphQLBoolean },
                img: {
                    data: { type: GraphQLNonNull },
                    contentType: { type: GraphQLString }
                },
                player_id: {type: GraphQLID }
            },
            async resolve(parent, args) {
                const data = await cleatController.addCleats(args)
                return data
            }
        },
        editCleats: {
            type: cleatType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)},
                title: { type: new GraphQLNonNull(GraphQLString)},
                brand: { type: new GraphQLNonNull(GraphQLString)},
                price: { type: new GraphQLNonNull(GraphQLString) },
                releaseDate: { type: new GraphQLNonNull(GraphQLString) },
                features: {
                    terrain: { type: new GraphQLNonNull(GraphQLString) },
                    material: { type: new GraphQLNonNull(GraphQLString) },
                    size: { type: new GraphQLNonNull(GraphQLInt) },
                    width: { type: new GraphQLNonNull(GraphQLString) },
                    color: { type: new GraphQLNonNull(GraphQLString) }
                },
                hidden: { type: new GraphQLNonNull(GraphQLBoolean) },
                img: {
                    data: { type: new GraphQLNonNull },
                    contentType: { type: new GraphQLNonNull(GraphQLString) }
                },
                player_id: {type: GraphQLID }
            },
            async resolve(parent, args) {
                const data = await cleatController.editCleats(args)
                return data
            }
        },
        deleteCleats: {
            type: cleatType,
           args: {
               id: { type: new GraphQLNonNull(GraphQLID) }
           },
           async resolve(parent, args) {
               const data = await cleatController.deleteCleats(args)
                return data
            }
        }
    }
   })

   module.exports = new GraphQLSchema({
       query: RootQuery,
       mutation: Mutations
   })