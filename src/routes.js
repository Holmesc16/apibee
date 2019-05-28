//Import controller
const cleatController = require('./controllers/cleatController')

const routes = [
    {
        method: 'GET',
        url:'/api/cleats',
        handler: cleatController.getCleats
    },
    {
        method: 'GET',
        url: '/api/cleats/:id',
        handler: cleatController.getSingleCleats
    },
    {
        method: 'POST',
        url: '/api/cleats',
        handler: cleatController.addCleats
    },
    {
        method: 'PUT',
        url: '/api/cleats/:id',
        handler: cleatController.updateCleats
    },
    {
        method: 'DELETE',
        url: '/api/cleats/:id',
        handler: cleatController.deleteCleats
    }
]

module.exports = routes