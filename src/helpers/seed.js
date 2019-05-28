const faker = require('faker')
const boom = require('boom')

const fastify = require('../server.js')

const _cleats = [
    {
        title: 'Sobakov Boost',
        brand: 'Adidas',
        price: '$220',
        releaseDate: 2019
    },
    {
        title: 'PrimeKnit Fly',
        brand: 'Nike',
        price: '$320',
        releaseDate: 2019
    },
    {
        title: 'Predator World Cup 2018',
        brand: 'Adidas',
        price: '$279',
        releaseDate: 2017
    },
    {
        title: 'Big Cat Special Shoes',
        brand: 'Puma',
        price: '$195',
        releaseDate: 2016
    }
]

// const players = ['Henri Gatusso', 'Ruud Van Nistelrooy', 'Koke', 'Cristiano Ronaldo', 'Gareth Bale']

const Cleats = require('../models/Cleats')
const Player = require('../models/Player')

//Fake data
const generatePlayerData = () => {
    let playerData = []
    let i = 0

    while(i < 51) {
        const firstName = faker.fake('{{name.firstName}}')
        const lastName = faker.fake('{{name.lastName}}')
        const age = faker.fake('{{random.number}}')
        const nationality = faker.fake('{{address.country}}')
        const number = 7
        const status = {
            club: {
                name: faker.fake('{{lorem.word}}'),
                country: faker.fake('{{address.country}}')
            }
        }
        const position = faker.fake('{{lorem.word}}')
        const isStarter = faker.fake('{{random.boolean}}') 
        
        const player = {
            firstName,
            lastName,
            age,
            nationality,
            number,
            status,
            position,
            isStarter 
        }
        playerData.push(player)
        i++
    }
    return playerData
}

const generateCleatsData = playerIds => {
    let cleatsData = []
    let i = 0

    while(i < 1001) {
        const player_id = faker.random.arrayElement(playerIds)
        const cleatsObject = faker.random.arrayElement(_cleats)
        const title =  faker.random.arrayElement(cleatsObject.title)
        const price =  faker.random.number({min: 100, max: 499})
        const releaseDate =  faker.fake('{{date.recent}}')
        const features =  {
            terrain: faker.fake('{{lorem.word}}'),
            material: faker.fake('{{lorem.word}}'),
            size: faker.fake('{{random.number}}'),
            width: faker.fake('{{lorem.word}}'),
            color: faker.fake('{{commerce.color}}')
        }
        const hidden =  faker.fake('{{random.boolean}}')
        const img =  {
            data: faker.fake('{{image.sports}}'),
            contentType: 'image'
        }

        const cleats = {
            player_id,
            title,
            brand: cleatsObject.title,
            price,
            releaseDate,
            features,
            hidden,
            img
        }

        cleatsData.push(cleats)
    }
    return cleatsData
}

fastify.ready().then(
        async () => {
            try {
                const players = await Player.insertMany(generatePlayerData())
                console.log('PLAYERS', players)
                const playerIds = players.map(v => v._id)

                const cleats = await Cleats.insertMany(generateCleatsData(playerIds))
                const cleatsIds = cleats.map(v => v._id)

                console.log(`
                - ${players.length} players added
                - ${cleats.length} cleats added
                `)
            }
            catch(err) {
                throw boom.boomify(err)
            }
            process.exit()
        },
        err => {
            console.log('An error occurred:', err)
            process.exit()
        }
)