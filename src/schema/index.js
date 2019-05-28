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

})

// price: String,
//     releaseDate: Number,
//     features: {
//         terrain: String,
//         material: String,
//         size: Number,
//         width: String,
//         color: String
//     },
//     hidden: Boolean,
//     img: {
//         data: Buffer,
//         contentType: String
//     },